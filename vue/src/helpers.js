function invalidProperties(obj) {
    for (var key in obj) {
        if (obj[key] !== null && obj[key] != "")
            return false;
    }
    return true;
}

const apiRoot = process.env.VUE_APP_API_ROOT || ""

module.exports = {invalidProperties, apiRoot}