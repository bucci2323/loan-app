import { Sequelize, DataType } from "sequelize";
const sequelize = new Sequelize("Loan", "root", "123456789", {
    host: "127.0.0.1",
    dialect: "mysql",
    // operatorsAliases: 0,
  });

  export { sequelize, DataType };