import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';

export interface IUserModel extends Model {
  id: number;
  username: string;
  password: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

type UserModelStatic = ModelStatic<IUserModel>;

export const userModel = (sequelize: Sequelize): UserModelStatic => {
  return sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['username', 'phone']
      }
    ]
  }) as UserModelStatic;
};

const User = userModel;
export default User;