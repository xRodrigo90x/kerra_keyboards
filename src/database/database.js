import { Sequelize } from "sequelize";
import 'dotenv/config'


let database = process.env.DB_DATABASE
let user = process.env.DB_USER
let password = process.env.DB_PASSWORD
let host = process.env.DB_HOST
let port = process.env.DB_PORT

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: "postgres",
  port: port,
  dialectOptions: {
    ssl: {
      require: true, // Requerir SSL
      rejectUnauthorized: false // Opción adicional para deshabilitar la verificación del certificado
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});




export default sequelize;
