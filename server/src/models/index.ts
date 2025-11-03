import { Sequelize, ModelStatic } from 'sequelize';
import { IUserModel, userModel } from './User';
import { IChitNoteModel, chitNoteModel } from './ChitNote';
import { ITransactionModel, transactionModel } from './Transaction';

const sequelize = new Sequelize('moi_note', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

interface IDB {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  User: ModelStatic<IUserModel>;
  ChitNote: ModelStatic<IChitNoteModel>;
  Transaction: ModelStatic<ITransactionModel>;
}

const db = {} as IDB;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = userModel(sequelize);
db.ChitNote = chitNoteModel(sequelize);
db.Transaction = transactionModel(sequelize);

db.User.hasMany(db.ChitNote, { foreignKey: 'userId' });
db.ChitNote.belongsTo(db.User, { foreignKey: 'userId' });

db.ChitNote.hasMany(db.Transaction, { foreignKey: 'chitNoteId' });
db.Transaction.belongsTo(db.ChitNote, { foreignKey: 'chitNoteId' });

const syncOptions = { alter: true };

db.sequelize.sync(syncOptions)
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error: Error) => {
    console.error('Error syncing database:', error);
  });

export default db;