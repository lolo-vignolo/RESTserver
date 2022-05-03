const Roles = require('../models/rol.model');
const Usuario = require('../models/usuario.model');

const esRoleValido = async (rol = '') => {
  const existedRol = await Roles.findOne({ rol });
  if (!existedRol) {
    throw new Error(`El rol ${rol} no existe en la base de datos`);
  }
};

const existEmail = async (correo = '') => {
  const emailExist = await Usuario.findOne({ correo });
  if (emailExist) {
    throw new Error(`El correo ${correo} ya existe`);
  }
};

const existId = async (id = '') => {
  const idExist = await Usuario.findById(id);
  if (!idExist) {
    throw new Error(`El id ${id} no existe en la base de datos`);
  }
};
module.exports = {
  esRoleValido,
  existEmail,
  existId,
};
