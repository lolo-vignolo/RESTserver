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
// todo lo que extraifo del objeto queda fuera d ela respuesta al usuario, pero si quiero que vaya a al usuario la respueta
// pero por ejemplo con un keyName diferente, puedo hacer como con _id. Lo extraigo, lo trabajo y lo devuelvo.
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
};

//usuarios  sera el nombre de la coleccion en la base de datos cafeDB
const usuario = model('Usuarios', UsuarioSchema);

module.exports = usuario;
