import sequelize from "../database/database.js";
import { QueryTypes } from "sequelize";
import Perfil from "../models/perfil.model.js";


const completarPerfil = async (req, res) => {

    
    try {
        
        
        let id = req.usuario.Perfile.usuarioId                
        

        let { telefono, region, comuna, direccion, referencias } = req.body
        

        let perfil = await Perfil.update({
            telefono,
            region,
            comuna,
            direccion,
            referencias

        }, {
            where: {
                usuarioId: id
            }
        });

       

        return res.status(201).json({
            code: 201,
            message: "Perfil actualizado con éxito.",
            perfil: perfil,
        });
    } catch (error) {

    }
}

export default completarPerfil; 