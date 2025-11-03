import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';

export interface IChitNoteModel extends Model {
  id: number;
  Date: Date;
  NoteName: string;
  Discribtion: string;
  userId?: number;
  createdAt: Date;
  updatedAt: Date;
}

type ChitNoteModelStatic = ModelStatic<IChitNoteModel>;

export const chitNoteModel = (sequelize: Sequelize): ChitNoteModelStatic => {
  return sequelize.define('ChitNote', {
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
    NoteName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Discribtion: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['id']
      }
    ]
  }) as ChitNoteModelStatic;
};

const ChitNote = chitNoteModel;
export default ChitNote;