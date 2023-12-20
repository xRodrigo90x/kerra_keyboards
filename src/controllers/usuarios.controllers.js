import sequelize from "../database/database.js";
import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import Usuario from "../models/usuario.model.js"
import Perfil from "../models/perfil.model.js";
import 'dotenv/config'

let secret = process.env.JWTK_SECRET
let user = process.env.NODEMAILER_USER
let pass = process.env.NODEMAILER_PASSWORD

const crearUsuario = async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body;

        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({
                code: 400,
                message: "El email ingresado ya se encuentra registrado."
            });
        };

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const token = jwt.sign({}, secret, { expiresIn: "1h" });


        const nuevoUsuario = await Usuario.create({
            nombre,
            apellido,
            email,
            password: hash,
            token
        });

        const nuevoUsuarioId = nuevoUsuario.dataValues.id;
        const perfil = Perfil.findOrCreate({
            where: { usuarioId: nuevoUsuarioId }
        });



        //  enviar el correo de verificación
        await enviarCorreoVerificacion(email, token, nombre);

        res.status(201).json({
            code: 201,
            message: "Usuario creado con éxito",
            data: nuevoUsuario
        });
    } catch (error) {
        console.log("Error crearUsuario", error);
        res.status(500).json({
            code: 500,
            message: "Error al crear el nuevo usuario, verifique los datos ingresados."
        });
    }
};

//cambiar el destinatario por el mail real de registro
const enviarCorreoVerificacion = async (destinatario, token, nombre) => {
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: user,
            pass: pass
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    //completar el mail con info de expiracion del token
    await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: `${destinatario}`,
        subject: "Hello ✔",
        // text: "Hello world?", // plain text body
        html: `<a href="http://localhost:4000/verificarRegistro/${token}">${nombre} ${destinatario} Verifica tu cuenta acá </a>`

    });
};

const verificarRegistro = async (req, res) => {
    const { token } = req.params;

    try {

        let usuario = await Usuario.findOne({
            where: { token: token }
        })

        if (usuario) {
            usuario.verificado = true;
            await usuario.save();
        }

        res.status(200).json({
            code: 200,
            message: "Cuenta verificada con éxito",
        });
    } catch (error) {
        console.log("Error al verificar registro", error);
        res.status(500).json({
            code: 500,
            message: "Error al verificar el registro, token no válido",
        });
    }
};



const login = async (req, res) => {
    try {
        let { verificado } = req.usuario.dataValues

        if (!verificado) {
            return res.status(403).json({
                code: 403,
                message: "No puedes iniciar sesión hasta que tu cuenta esté verificada."

            })
        } else {
            res.status(200).json({
                code: 200,
                message: "Login éxitoso.",
                token: req.token,
                usuario: req.usuario
            });
        };

    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error en el proceso de autenticación.",
        });
    };
};



const buscarUsuario = async (req, res) => {
    try {

        let usuarios = await Usuario.findAll({


            order: [["id", "ASC"]],

            attributes: ["id", "nombre", "apellido", "email"],

            include: [{
                model: Perfil,
                attributes: ["id", "telefono", "region", "comuna", "direccion", "referencias"]
            }]
        });

        res.json({ code: 200, message: "ok", data: usuarios });
    } catch (error) {
        console.log("Error findAll usuarios", error);
        res.status(500).json({
            code: 500,
            message: "Error al obtener los datos de usuarios.",
        });
    }
};

let controladores = {
    crearUsuario,
    login,
    buscarUsuario,
    verificarRegistro
}
export default controladores;
