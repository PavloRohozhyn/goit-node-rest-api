import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";

import { EMAIL_PATTERN } from "../../consts/constans.js";

const User = sequelize.define(
  "user",
  {
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email in use",
      },
      validate: {
        isEmail: EMAIL_PATTERN,
      },
    },
    subscription: {
      type: DataTypes.ENUM,
      values: ["starter", "pro", "business"],
      defaultValue: "starter",
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "User",
    freezeTableName: true,
  }
);

// User.sync({ alter: true });
// User.sync({ forse: true });

export default User;
