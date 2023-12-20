import { BOOLEAN, DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Usuario = sequelize.define(
  "Usuarios",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },

    password: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    token: {
      type: DataTypes.STRING(200),
      defaultValue: null
    },

    verificado: {
      type: BOOLEAN(),
      defaultValue: false
    },

    admin: {
      type: DataTypes.BOOLEAN(),
      allowNull: true,
      defaultValue: false,
      validate: {
        notEmpty: {
          msg: "Campo admin no permite guardar valores vacíos.",
        },
      },
    },
  },
  {
    timestamps: true,
    tableName: "Usuarios",
  }
);

export default Usuario;
