import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';

export interface ITransactionModel extends Model {
  id: number;
  Date: Date;
  ReceiptNo: number;
  Amount: number;
  TotalAmount: number;
  Total: number | null;
  createdAt: Date;
  updatedAt: Date;
}

type TransactionModelStatic = ModelStatic<ITransactionModel>;

export const transactionModel = (sequelize: Sequelize): TransactionModelStatic => {
  return sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ReceiptNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TotalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Total: {
        type: DataTypes.INTEGER,
        allowNull: true,

    },
}, {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['ReceiptNo']
      }
    ]
  }) as TransactionModelStatic;
};

const Transaction = transactionModel;
export default Transaction;