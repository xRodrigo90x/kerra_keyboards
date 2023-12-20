import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Perfil = sequelize.define(
    'Perfiles', {
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
    },

    region: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    comuna: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    referencias: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
}, {
    timestamps: true,
    tableName: "Perfiles",
});

export default Perfil