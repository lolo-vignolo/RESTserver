const { Router } = require('express');
const {
  getFunction,
  putFunction,
  postFunction,
  deleteFunction,
} = require('../controllers/usuarios.controllers');

const router = Router();

// cualquier cosa que agregue al "/" se agregara en la ruta despues de la ruta establecida en el constructor

router.get('/', getFunction);

router.put('/:id', putFunction);

router.post('/', postFunction);

router.delete('/', deleteFunction);

module.exports = router;
