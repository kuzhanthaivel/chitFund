"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
exports.initializeDatabase = initializeDatabase;
const sequelize_1 = require("sequelize");
const dbConfig = {
    database: 'moi_note',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
};
const sequelize = new sequelize_1.Sequelize(dbConfig);
exports.sequelize = sequelize;
async function initializeDatabase() {
    try {
        const tempSequelize = new sequelize_1.Sequelize({
            ...dbConfig,
            database: '',
        });
        await tempSequelize.query('CREATE DATABASE IF NOT EXISTS moi_note;');
        console.log('Database checked/created successfully');
        await tempSequelize.close();
        await sequelize.authenticate();
        console.log('Database connection established successfully');
        return sequelize;
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
}
