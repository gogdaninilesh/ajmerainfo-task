const Sequelize = require("sequelize");
const { config } = require('../../config/index');

const dbConfig = {
    username: config.DB_USERNAME,// "root
    password: config.DB_PASSWORD, // "root
    db: config.DB_NAME, // "test
    host: config.DB_HOST, // "localhost
    port: config.DB_PORT, // 3306
};

console.log(dbConfig);

const sequelize = new Sequelize(
    dbConfig.db,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            idle: 20000,
            handleDisconnects: true,
        },
        logging: false,
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

sequelize.sync({ force: false }).then
    (() => {
        console.log("Database synced");
    }).catch
    ((err) => {
        console.log("Error creating database: " + err);
    });


module.exports = sequelize;