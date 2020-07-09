const config = {
    PORT: process.env.PORT,
    BAIDU_AK: process.env.BAIDU_AK,
};

function check_config() {
    for (const key in config) {
        if (!config[key]) throw ReferenceError(
            `Config Value ${key} is not defined`
        )
    }
};

module.exports = {config, check_config};
