import { DataTypes } from "sequelize";

import sequelize from "./../sequelize.js";
import { PHONE_PATTERN } from "../../consts/constans.js";

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
      references: {
        model: "User",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Contact",
    tableName: "Contact",
    freezeTableName: true,
  }
);

Contact.associate = (models) => {
  Contact.belongsTo(models.User, { foreignKey: "owner" });
};

// Contact.sync({ alter: true });
Contact.sync({ force: true });

export default Contact;
