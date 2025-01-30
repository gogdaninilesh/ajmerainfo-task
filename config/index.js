const dotenv = require('dotenv');
const path = require('path');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv.config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`) });

console.log(`===== Environment : ${process.env.NODE_ENV} =====`);
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
const config = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRES: process.env.JWT_EXPIRES,
    IMG_URl: process.env.IMG_URl
}
module.exports = { config };