import Producto from "./producto.model.js";
import Usuario from "./usuario.model.js";
import Venta from "./ventas.model.js";
import Perfil from "./perfil.model.js";

Usuario.hasOne(Perfil,{
    foreignKey:"usuarioId"
});
Perfil.belongsTo(Usuario,{
    foreignKey:"usuarioId"
});


Usuario.hasMany(Venta, {
    as: "Ventas",
    foreignKey: "usuarioId",
});

Venta.belongsTo(Usuario, {
    foreignKey: "usuarioId",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    as: "usuarios",
});

Venta.belongsToMany(Producto, { through: 'VentaProducto' });
Producto.belongsToMany(Venta, { through: 'VentaProducto' });

