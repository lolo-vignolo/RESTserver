const { Schema, model } = require('mongoose');

const RolSchema = new Schema({
  rol: {
    type: String,
    required: [true, 'El rol es necesario'],
  },
});

const rol = model('Roles', RolSchema);

module.exports = rol;
