import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Venta = sequelize.define(
  "Ventas",
  {
    fechaVenta: {
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    idUsuario: {
      type: DataTypes.INTEGER,

    },
    idProducto: {
      type: DataTypes.INTEGER,

    },
    precioUnitario: {
      type: DataTypes.INTEGER,

    },
    valorVenta: {
      type: DataTypes.INTEGER,

    },

  },
  {
    timestamps: true,
    tableName: "Ventas",
  }
);


export default Venta;