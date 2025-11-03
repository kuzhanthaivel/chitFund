"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('moi_note', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});
const User = sequelize.define('User', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    profilePic: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'image-1760518610981-637600666.png'
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    MyChit: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
    },
}, {
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['username', 'phone']
        }
    ]
});
User.sync({ alter: true })
    .then(() => console.log('User table created successfully'))
    .catch(console.error);
exports.default = User;
