

export const verificar = (req, res, next) => {
    if (req.error) {
        return next();
    } else {
        if (req.usuario) {
            let usuario = req.usuario;
            if (usuario.admin) {
                return next();
            } else {
                let path = req.route.path;
                if (path.includes("api")) {
                    return res.status(403).json({
                        code: 403,
                        message:
                            "Usted no tiene los permisos necesarios para acceder a este recurso.",
                    });
                } else {
                    req.error = "Usted no tiene los permisos necesarios para acceder a este recurso.";
                    return next();
                }
            }
        } else {
            let path = req.route.path;
            if (path.includes("api")) {
                return res.status(403).json({
                    code: 403,
                    message: "No se encontró información respecto al usuario.",
                });
            } else {
                req.error = "No se encontró información respecto al usuario."
                return next();
            };

        };
    };

};

