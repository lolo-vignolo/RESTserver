const { response } = require('express');
var bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario.model');

const getFunction = async (req, res = response) => {
  const { limit = 5, desde = 0 } = req.query;

  if (!Number(limit) || !Number(desde)) {
    res.status(400).json({
      ok: false,
      msg: 'Los parámetros limit y desde deben ser números',
    });
  }

  // PUEDO HACERLO ASÍ, Y DE ESTA FORMA UNA PROMESA SE EJECULA LUEGO DE LA OTRA:
  // const usuarios = await Usuario.find({ estado: true })
  //   .limit(Number(limit))
  //   .skip(Number(desde));

  // const totalUsuarios = await Usuario.countDocuments({ estado: true });

  // O BIEN REALIZARLO ASI, Y AMBAS PROMESAS SE EJECUTAN JUNTAS.

  const promesas = await Promise.all([
    Usuario.countDocuments({ estado: true }), //cuenta los usuarios que esten activos
    Usuario.find({ estado: true }) //busca todos los usuarios que esten activos
      .limit(Number(limit))
      .skip(Number(desde)),
  ]);

  res.json({
    msj: 'lista de usuarios en la base de datos',
    total_Usuarios: promesas[0],
    usuarios: promesas[1],
  });
};

const putFunction = async (req, res = response) => {
  const id = req.params.id;

  // resto vendría a ser la info ingresada por el usuario, la info que quiere actualizar en cada campo.
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync(10);
    resto.password = bcrypt.hashSync(password, salt);
  }

  //_id y id tienen el mismo valor, pero _id es una propiedad pertenece al usuario guardado en la base de datos, mientras que id es una propiedad que la extraigo del req.params.id (url)

  const usuarioPorActualizar = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    message: ' put API',
    usuarioPorActualizar,
  });
};

const postFunction = async (req, res = response) => {
  const { nombre, password, correo, rol, img } = req.body;

  const usuario = new Usuario({ nombre, password, correo, rol, img }); //crear el objeto

  //encriptar password
  const salt = bcrypt.genSaltSync(10);
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();

  res.json({
    message: 'Usuario guardado',
    usuario,
  });
};

const deleteFunction = async (req, res = response) => {
  const { id } = req.params;

  //const deleteUsuario = await Usuario.findByIdAndDelete(id);
  const deleteUsuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({
    deleteUsuario,
  });
};

module.exports = {
  getFunction,
  putFunction,
  postFunction,
  deleteFunction,
};
