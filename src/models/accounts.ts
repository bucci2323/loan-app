import { DataTypes, DecimalDataType, Model, Optional } from 'sequelize';
import { sequelize } from '../database/db';  // Assuming you have a db.ts that exports sequelize instance

// Define the attributes for the Account model
interface AccountAttributes {
  id: number;
  userID: number;
  accountNumber: string;
  balance: DecimalDataType;
  openDate: Date;
  accountStatus: string;
  investmentFlag: boolean;
  savingsFlag: boolean;
}


interface AccountCreationAttributes extends Optional<AccountAttributes, 'id'> {}


class Account extends Model<AccountAttributes, AccountCreationAttributes> implements AccountAttributes {
  public id!: number; 
  public userID!: number;
  public accountNumber!: string;
  public balance!: DecimalDataType;
  public openDate!: Date;
  public accountStatus!: string;
  public investmentFlag!: boolean;
  public savingsFlag!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


Account.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
  },
  openDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  accountStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
  investmentFlag: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  savingsFlag: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize, 
  tableName: 'Accounts',  
  timestamps: true,      
});

export default Account;
