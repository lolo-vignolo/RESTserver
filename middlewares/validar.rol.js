const { response } = require('express');
const { request } = require('express');

const validarRol = (req, res, next) => {
  if (!req.usuarioAuth) {
    return res.status(500).json({
      ok: false,
      message: 'validar el usuario sin requerir el token de autenticación',
    });
  }
  const rol = req.usuarioAuth.rol;
  if (rol === 'ADMIN_ROLE') {
    next();
  } else {
    return res.status(401).json({
      ok: false,
      message: 'No tienes permisos para realizar esta accion',
    });
  }
};

// siempre que creo un middelware, tengo que tener el res, req, next.
//en este caso si bien no está en la funcion principal, esta tiene un callback que contiene esos parametros.
const tieneRol = (...roles) => {
  return (req = request, res = response, next) => {
    const rol = req.usuarioAuth.rol;
    if (roles.includes(rol)) {
      next();
    } else {
      return res.status(401).json({
        ok: false,
        message:
          'este usuario no tiene autorizacion para realizar esta accion , solo administradores y moderadores ',
      });
    }
  };
};

module.exports = {
  validarRol,
  tieneRol,
};
