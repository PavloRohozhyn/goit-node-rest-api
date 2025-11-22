import { DataTypes } from "sequelize";

import sequelize from "./../sequelize.js";
import { PHONE_PATTERN } from "./../../consts/contact.constans.js";

const Contact = sequelize.define(
  "contact",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: {
        args: "email",
        msg: "The email is already taken!",
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: PHONE_PATTERN,
      },
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Contact",
    tableName: "Contact",
    freezeTableName: true,
  }
);

// Contact.sync({ alter: true });
// Contact.sync({ forse: true });

export default Contact;
