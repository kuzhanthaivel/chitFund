import { Sequelize, DataTypes, Model, ModelStatic, Optional } from 'sequelize';
import { IUserModel } from './User';
import { ITransactionModel } from './Transaction';

export interface IChitNoteAttributes {
  id: number;
  date: Date;
  noteName: string;
  description: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
  transactions?: ITransactionModel[];
  author?: IUserModel;
}

export interface IChitNoteCreationAttributes extends Optional<IChitNoteAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IChitNoteModel extends Model<IChitNoteAttributes, IChitNoteCreationAttributes>, IChitNoteAttributes {
  // Instance methods can be added here
}

type ChitNoteModelStatic = ModelStatic<IChitNoteModel> & {
  associate?: (models: {
    User: typeof IUserModel;
    Transaction: typeof ITransactionModel;
  }) => void;
};

export const chitNoteModel = (sequelize: Sequelize): ChitNoteModelStatic => {
  const ChitNote = sequelize.define<IChitNoteModel>('ChitNote', {
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
    noteName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'note_name',
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users', // Note: This should match the table name, not the model name
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
    tableName: 'chit_notes',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['user_id'] // Index for the foreign key
      }
    ]
  }) as unknown as ChitNoteModelStatic;

  // Define associations
  ChitNote.associate = (models) => {
    ChitNote.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
      onDelete: 'CASCADE'
    });
    
    ChitNote.hasMany(models.Transaction, {
      foreignKey: 'chitNoteId',
      as: 'transactions',
      onDelete: 'CASCADE'
    });
  };

  return ChitNote;
};

export default chitNoteModel;