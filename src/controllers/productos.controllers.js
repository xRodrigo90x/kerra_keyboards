import sequelize from "../database/database.js";
import { QueryTypes } from "sequelize";
import Producto from "../models/producto.model.js"
import * as middlewareUpload from "../middlewares/uploadImage.middleware.js";

export const create = async (req, res) => {
    try {
        let { nombreProducto, descripcion, precio, stock } = req.body;


        /* req.imagen = result.public_id;
        req.rutaImagen = result.secure_url; */

        let nuevoProducto = await Producto.create({
            nombreProducto,
            descripcion,
            precio,
            stock,
            imagen: req.imagen, // req.imagen corresponde al nombre public - public id de la imagen
            rutaImagen: req.rutaImagen // corresponde a la ruta cloud donde se almacena la imagen
        });

        return res.status(201).json({
            code: 201,
            message: "Producto creado con éxito.",
            producto: nuevoProducto,
        });

    } catch (error) {
        console.log(error);
        //si no se crea el producto, lo eliminamos del servicio cloud

        middlewareUpload.deleteImage.deleteImage(req.imagen).then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            res.status(500).json({
                code: 500,
                message: "Producto no pudo ser creado.",
            });
        })
    }
};

export const deleteById = async (req, res) => {
    let id = req.params.id;
    try {
        let producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({
                code: 404,
                message: `No fue posible encontrar un producto con el id: ${id}`,
            });
        }

        //SI PRODUCTO EXISTE...
        middlewareUpload
            .deleteImage(producto.imagen)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log("Error eliminar imagen servicio cloud", error);
            })
        
        await producto.destroy();
        res.status(200).json({
            code: 200,
            message: `Producto con ID:${id}, eliminado con éxito.`,
        });

    } catch (error) {
        console.log("Error elimiar producto", error)
        res.status(500).json({
            code: 500,
            message: `Producto no pudo ser eliminado con id: ${id}`,
        });
    }

}

export const update = async (req, res) => {
    let { id, nombreProducto, descripcion, precio, stock } = req.body;

    try {
        //buscamos el producto para saber si existe
        let producto = await Producto.findByPk(id);

        //si no existe el producto respondemos con un 404
        if (!producto) {
            //si existe req.imagen (cuando se carga una imagen para reemplazo) eliminamos la imagen del servicio cloud
            if (req.imagen) {
                uploadsMiddleware
                    .deleteImage(req.imagen)
                    .then((result) => {
                        console.log(result);
                    })
                    .catch((error) => {
                        console.log(
                            "Error eliminar imagen servicio cloud",
                            error
                        );
                    });
            }

            return res.status(404).json({
                code: 404,
                message: `No fue posible encontrar un producto con el id: ${id}`,
            });
        }

        //si existe lo actualizamos

        /* req.imagen = result.public_id;
        req.rutaImagen = result.secure_url; */

        let propiedadesChange = req.body;
        delete propiedadesChange.id;

        if (req.imagen) {
            propiedadesChange.imagen = req.imagen;
            propiedadesChange.rutaImagen = req.rutaImagen;

            //eliminar la imagen antigua del servicio cloud
            uploadsMiddleware
                .deleteImage(producto.imagen)
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => {
                    console.log("Error eliminar imagen servicio cloud", error);
                });
        }

        await producto.update(propiedadesChange);

        res.status(201).json({
            code: 201,
            message: "Producto actualizado con éxito.",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: `Producto con id: ${id}, no pudo ser actualizado `,
        });
    }
};