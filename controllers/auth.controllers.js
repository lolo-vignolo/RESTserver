const { response } = require('express');
var bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/crearJWT');

const loginPost = async (req, res = response) => {
  const { correo, password } = req.body;

  const usuarioExist = await Usuario.findOne({ correo });
  if (!usuarioExist) {
    return res.status(400).json({
      ok: false,
      message: 'Correo o contraseña incorrectos - correo',
    });
  }

  if (usuarioExist.estado === false) {
    return res.status(400).json({
      ok: false,
      message: 'Usuario deshabilitado',
    });
  }

  const checkPassword = bcrypt.compareSync(password, usuarioExist.password);

  if (!checkPassword) {
    return res.status(400).json({
      ok: false,
      message: 'Correo o contraseña incorrectos - password',
    });
  }

  const token = await generarJWT(usuarioExist._id);

  res.json({
    message: 'LOGIN OK',
    usuarioExist,
    token,
  });
};

module.exports = {
  loginPost,
};
