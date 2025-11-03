"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("./User"));
const Event_1 = __importDefault(require("./Event"));
const Transaction_1 = __importDefault(require("./Transaction"));
const sequelize = new sequelize_1.Sequelize('moi_note', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});
const db = {};
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
db.User = User_1.default;
db.Event = Event_1.default;
db.Transaction = Transaction_1.default;
db.User.hasMany(db.Event, { foreignKey: 'userId' });
db.Event.belongsTo(db.User, { foreignKey: 'userId' });
db.User.hasMany(db.Transaction, { foreignKey: 'PaidByUserId' });
db.Transaction.belongsTo(db.User, { foreignKey: 'PaidByUserId' });
db.User.hasMany(db.Transaction, { foreignKey: 'PaidToUserId' });
db.Transaction.belongsTo(db.User, { foreignKey: 'PaidToUserId' });
exports.default = db;
