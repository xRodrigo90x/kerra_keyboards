import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import 'dotenv/config'
import Usuario from "../models/usuario.model.js";
import Perfil from "../models/perfil.model.js";

let secret = process.env.JWTK_SECRET

 const emitToken = async (req, res, next) => {
    try {
        let { email, password } = req.body;

        let usuario = await Usuario.findOne({
            where: {
                email,
            },
            attributes: ["id", "nombre", "email", "password","admin", "verificado"],
        });
        if (!usuario) {
            return res.status(400).json({
                code: 400,
                message: "Email y/o password incorrecto.",
            });
        }

        let validacionPassword = bcrypt.compareSync(password, usuario.password); 

        if (!validacionPassword) {
            return res.status(400).json({
                code: 400,
                message: "Email y/o password incorrecto.",
            });
        } else {
            delete usuario.password;
        }

        let token = jwt.sign(
            {
                data: usuario,
            },
            secret,
            { expiresIn: "1h" }
        );

        req.token = token;
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error en proceso de autenticación."
        });
    }
};



const verifyToken = (req, res, next) => {
    let baseUrl = req.baseUrl;
    let { token } = req.params;
    let authorization = req.headers.authorization;
    if (!token) {
        try {
            token = authorization.split(" ")[1];
            if (!token) {
                throw new Error("sin token");
            }
        } catch (error) {
            if (baseUrl.includes("api")) {
                return res.status(400).json({
                    code: 400,
                    message: "Debe proporcionar un token para acceder.",
                });
            }   else {
                return res.status(400).json({
                    error: "Debe proporcionar un token para acceder",
                });
            }             
        }
    }

    jwt.verify(token, secret, async (error, decoded) => {
        let hostname = req.hostname;
        if (error) {
            
            if (hostname.includes("api")) {
                return res.status(401).json({
                    code: 401,
                    message: "El token proporcionado es inválido.",
                });
            } else {
                return res.json({
                    error: "El token proporcionado es inválido.",
                });
            } 
        }
        let datosUsuarioToken = decoded.data;      
        let usuario = await Usuario.findByPk(datosUsuarioToken.id,{
            attributes: ["id", "nombre", "email", "admin"],
            include: [{
                model: Perfil,
                attributes: ["id", "telefono", "region", "comuna", "direccion", "referencias", "usuarioId"]
            }]
        });
        usuario = usuario.toJSON();
        req.usuario = usuario;
        res.send(usuario)
        next();
    });
};


let controladores = {
    emitToken,
    verifyToken
};

export default controladores;