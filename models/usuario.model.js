const { Schema, model } = require('mongoose');
// {
//    nombre: '',
//    correo: '',
//    password: '',
//    img: '',
//    rol: '',
//    estado: false,
//    google: false,
// }

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es necesario'],
  },
  correo: {
    type: String,
    require: [true, 'El correo es necesario'],
    unique: [true, 'El correo ya existe'],
  },
  password: {
    type: String,
    required: [true, 'El password es necesario'],
  },
  img: {
    type: String,
    required: false,
  },
  rol: {
    type: String,
    emun: ['USER_ROLE', 'ADMIN_ROLE'],
    require: [true, 'El rol es necesario'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

//toObject es para que no se muestre el password en el json que de devuelvo al cliente.
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...object } = this.toObject();
  return object;
};

//usuarios  sera el nombre de la coleccion en la base de datos cafeDB
const usuario = model('Usuarios', UsuarioSchema);

module.exports = usuario;
