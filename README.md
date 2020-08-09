# Air Quality Checker

[Live Demo](https://aq.chenxy.tech)  A full-stack serverless application, with Vue.js, Express.js & MongoDB

This is a prototype-y project to quickly check air quality attributes (mainly aimed for users in China). Data sources are:

- Baidu Maps (for GeoLocation data)
- Hefeng Weather (for air quality & weather forecast)

Persistence & Caching is available (though not taken much thought into), but is disabled for production (live demo) due to data collection laws and such.

## Configuration

Config is done mainly through environment variables:

### Front-end Configs

- `VUE_APP_API_ROOT` - Root URI of API Server

> Note: Front-end config is injected at compile time

### Back-end Configs

- `PORT` - Which port to listen to (Local dev server configured to 8000)
- `BAIDU_AK` - Baidu API access key
- `HEFENG_ID`, `HEFENG_KEY` - Hefeng API access ID & key

#### Persistence

- `CACHING_ENABLED` - Enable caching for API calls,  `true` / `false`
- `PERSISTENCE_ENABLED` - Enable persistence for API logs, `true` / `false`
- `MONGO_ENVIRONMENT` - `tcb` / `mongo`

#### Mongo

- `MONGO_CONNECT` - MongoDB connect URI
- `MONGO_DB` - Which database to use inside mongo

#### TCB

- `MONGO_TCB_ID`
- `MONGO_TCB_KEY`
- `MONGO_TCB_ENV`

> Note: TCB support is now deprecated, due to TCB not supporting the full Mongo client.
