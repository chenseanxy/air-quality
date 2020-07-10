const MongoClient = require('mongodb').MongoClient;
const tcb = require('tcb-admin-node');
const { config } = require("./config");
const moment = require("moment");

let client = {};

async function connectToDB(){
    if (config.MONGO_ENVIRONMENT == 'tcb'){
        client = tcb.init({
            env: config.MONGO_TCB_ENV,
            secretId: config.MONGO_TCB_ID,
            secretKey: config.MONGO_TCB_KEY,
        });
        return tcb.database();
        
    } else {
        client = new MongoClient(config.MONGO_CONNECT, { useUnifiedTopology: true });
        await client.connect();
        return client.db(config.MONGO_DB);
    }
}

function closeConnection(){
    if (config.MONGO_ENVIRONMENT == 'tcb'){
        // Nothing to do here
        return;
    } else {
        client.close();
    }
}

async function addDocument(document, collection) {
    if(!config.PERSISTENCE_ENABLED) return {};

    try{
        const db = await connectToDB();
        document.timestamp = moment().format();
        const result = await db.collection(collection)
            .insertOne(document);
        
        if(result.insertedCount != 1){
            throw Error(`Insert operation failed on collection: ${collection}`);
        }

    } catch (err) {
        console.error(err.stack);
    }
    closeConnection()
}

async function getCachedDocument(key, id, collection){
    if(!config.CACHING_ENABLED) return {};
    if(!config.PERSISTENCE_ENABLED) return {};

    var doc = {}
    try{
        const db = await connectToDB();

        let query = {};
        query[key] = id;

        // Get the last matching document
        const result = await db.collection(collection)
            .find(query).limit(1).sort({$natural:-1});
        
        if(await result.count() < 1){
            return {};
        }

        doc = await result.next();
        
        const age = moment.duration(
            moment().diff(moment(doc.timestamp))
        ).asSeconds();

        if (age > config.CACHE_AGE) {
            return {};
        }

    } catch (err) {
        console.error(err.stack);
        return {};
    }
    closeConnection();
    return doc;
}

module.exports = {addDocument, getCachedDocument};