const config = {
    PORT: process.env.PORT,
    BAIDU_AK: process.env.BAIDU_AK,
    HEFENG_KEY: process.env.HEFENG_KEY,
    HEFENG_ID: process.env.HEFENG_ID,
    MONGO_CONNECT: process.env.MONGO_CONNECT,
    MONGO_DB: process.env.MONGO_DB,
    MONGO_ENVIRONMENT: process.env.MONGO_ENVIRONMENT,
    MONGO_TCB_ID: process.env.MONGO_TCB_ID,
    MONGO_TCB_KEY: process.env.MONGO_TCB_KEY,
    MONGO_TCB_ENV: process.env.MONGO_TCB_ENV,
    CACHE_AGE: process.env.CACHE_AGE || 1800,
    CACHING_ENABLED: process.env.CACHING_ENABLED === 'true',
    PERSISTENCE_ENABLED: process.env.PERSISTENCE_ENABLED === 'true',
};

function check_config() {
    for (const key in config) {
        if (typeof config[key] == 'undefined') throw ReferenceError(
            `Config Value ${key} is not defined`
        )
    }
};

module.exports = {config, check_config};
