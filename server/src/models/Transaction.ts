import { Sequelize, DataTypes, Model, ModelStatic, Optional } from 'sequelize';
import { IUserModel } from './User';
import { IChitNoteModel } from './ChitNote';

export interface ITransactionAttributes {
  id: number;
  date: Date;
  receiptNo: string;
  amount: number;
  totalAmount: number;
  total: number | null;
  userId: number;
  chitNoteId: number;
  createdAt?: Date;
  updatedAt?: Date;
  user?: IUserModel;
  chitNote?: IChitNoteModel;
}

export interface ITransactionCreationAttributes extends Optional<ITransactionAttributes, 'id' | 'total' | 'createdAt' | 'updatedAt'> {}

export interface ITransactionModel extends Model<ITransactionAttributes, ITransactionCreationAttributes>, ITransactionAttributes {
  // Instance methods can be added here
}

type TransactionModelStatic = ModelStatic<ITransactionModel> & {
  associate?: (models: {
    User: typeof IUserModel;
    ChitNote: typeof IChitNoteModel;
  }) => void;
};

export const transactionModel = (sequelize: Sequelize): TransactionModelStatic => {
  const Transaction = sequelize.define<ITransactionModel>('Transaction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'date',
      defaultValue: DataTypes.NOW
    },
    receiptNo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'receipt_no',
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'amount',
      validate: {
        min: 0
      }
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'total_amount',
      validate: {
        min: 0
      }
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'total',
      validate: {
        min: 0
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    chitNoteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'chit_note_id',
      references: {
        model: 'chit_notes',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'transactions',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['user_id']
      },
      {
        fields: ['chit_note_id']
      },
      {
        unique: true,
        fields: ['receipt_no']
      }
    ]
  }) as unknown as TransactionModelStatic;

  // Define associations
  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE'
    });
    
    Transaction.belongsTo(models.ChitNote, {
      foreignKey: 'chitNoteId',
      as: 'chitNote',
      onDelete: 'CASCADE'
    });
  };

  return Transaction;
};

export default transactionModel;