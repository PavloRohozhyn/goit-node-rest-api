import sequelize from "./sequelize.js";
import { yellow, reset } from "./../helpers/color.js";

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(`${yellow}Database connect successfully.${reset}`);
  } catch (e) {
    console.log(`${red}Database connect failed ${e.message}${reset}`);
    process.exit(1);
  }
};

export default connectDatabase;
