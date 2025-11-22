import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: process.env.DBDIALECT,
  username: process.env.DBUSERNAME,
  password: process.env.DBUSERPASSWORD,
  host: process.env.DBHOSTNAME,
  database: process.env.DBNAME,
  port: process.env.DBPORT,
  dialectOptions: {
    ssl: true,
  },
});

export default sequelize;
