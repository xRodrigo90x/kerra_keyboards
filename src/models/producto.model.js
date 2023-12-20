import { v4 as uuidv4 } from "uuid";
import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Producto = sequelize.define(
  "Productos",

  {
    codigo: {     
      type: DataTypes.STRING(10), 
      defaultValue: () => uuidv4().substring(0, 5), 
    },    
    nombreProducto: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "producto.jpg",
      validate: {
          notEmpty: true,
      },
  }, 
    rutaImagen: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "/public/uploads/producto.jpg",
      validate: {
          notEmpty: true,
      },
  },
  },
  {
    timestamps: true,
    tableName: "Productos",
  }
);

export default Producto;
