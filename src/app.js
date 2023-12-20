import express from "express";
import cors from "cors";
import morgan from "morgan";
import upload from "express-fileupload";
import { create } from "express-handlebars"


//RUTAS
import views from "./routes/views.routes.js"
import crearProducto from "./routes/productos.routes.js";
import crearUsuario from "./routes/usuarios.routes.js";
import completarPerfil from "./routes/perfiles.routes.js"

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const app = express();

const hbs = create({
    partialsDir: [path.resolve(__dirname,"./views/partials/")]
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));
app.use(upload()); //req.files...

//ruta publica
app.use("/public", express.static(path.resolve(__dirname, "./public")));

//Ruta Vistas
app.use("/", views)

//RUTAS
app.use("/", crearProducto)
app.use("/", crearUsuario)
app.use("/", completarPerfil)




export default app;
