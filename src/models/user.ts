import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/db';

interface UserAttributes {
  userID: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  street: string;
  city: string;
  state: string;
  phoneNumber: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'userID'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public userID!: number;
  public firstName!: string;
  public middleName?: string;
  public lastName!: string;
  public email!: string;
  public dateOfBirth!: Date;
  public street!: string;
  public city!: string;
  public state!: string;
  public phoneNumber!: string;
}

User.init({
  userID: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  middleName: DataTypes.STRING(50),
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'users',
  timestamps: true
});

export default User;
