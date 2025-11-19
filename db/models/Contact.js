import { DataTypes } from "sequelize";

import sequelize from "./../sequelize.js";

const Contact = sequelize.define(
  "contact",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
