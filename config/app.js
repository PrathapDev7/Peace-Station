require('dotenv').config();

const config = module.exports;
config.PORT = process.env.APP_PORT;
config.HOST = process.env.APP_HOST;
