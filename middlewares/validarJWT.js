var jwt = require('jsonwebtoken');
var Usuario = require('../models/usuario.model');

const validarJWT = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'No hay token',
    });
  }

  const { uid } = jwt.verify(token, process.env.JWT_SECRET); // esto me devuelve la info del payload, en este caso puedo extraer el uid

  try {
    req.uid = uid; // screo la propiedad en el req llamada uid, y le asigno el uid que extraje del payload

    const usuarioAuthenticado = await Usuario.findById(uid);
    if (!usuarioAuthenticado) {
      return res.status(401).json({
        ok: false,
        message: 'Usuario no se encontrado en la base de datos',
      });
    }
    if (usuarioAuthenticado.estado === false) {
      return res.status(401).json({
        ok: false,
        message: 'Usuario deshabilitado - usuario estado false (ya eliminado)',
      });
    }

    // aquí creo una nueva propiedad en el req, para que pueda ser accedida desde cualquier parte del código.
    req.usuarioAuth = usuarioAuthenticado;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'Token invalido',
    });
  }
};

module.exports = {
  validarJWT,
};
