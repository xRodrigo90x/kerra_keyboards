import app from "./src/app.js";
import sequelize from "./src/database/database.js";
import "./src/models/init-models.js"

const PORT = 3000;
const main = async () => {
  try {
     app.get("/", (req,res) =>{
      res.send("Pagina Kerra Keyboards")
      
    })
    await sequelize.authenticate();
    await sequelize.sync({ force: false, alter: true });
    app.listen(PORT, () => {

      console.log("Servidor escuchando en puerto: " + PORT);
    });
  } catch (error) {
    console.log("Ha ocurrido un error: ", error);
  }
};

main();
