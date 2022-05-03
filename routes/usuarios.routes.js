const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {
  getFunction,
  putFunction,
  postFunction,
  deleteFunction,
} = require('../controllers/usuarios.controllers');

const { esRoleValido, existEmail, existId } = require('../helpers/validators');
const { controlCamposResult } = require('../middlewares/control.campos');

// cualquier cosa que agregue al "/" se agregara en la ruta despues de la ruta establecida en el constructor

router.get('/', getFunction);

router.put(
  '/:id',
  [
    check('id', 'No es valido').isMongoId(),
    check('id').custom(existId),
    check('rol').custom(esRoleValido),
    check(
      'password',
      'El password es obligatorio y debe contar con al menos 6 digitos'
    ).isLength({ min: 6 }),
    controlCamposResult,
  ],
  putFunction
);

// si el email no está repetido se puede registrar, verifico si es un mail valido
router.post(
  '/',
  [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check(
      'password',
      'El password es obligatorio y debe contar con al menos 6 digitos'
    ).isLength({ min: 6 }),
    //check('rol', 'El rol es obligatorio').isIn(['USER_ROLE', 'ADMIN_ROLE']),
    check('rol').custom(esRoleValido),
    check('correo').custom(existEmail),

    controlCamposResult,
  ],
  postFunction
);

router.delete(
  '/:id',
  [
    check('id', 'No es valido').isMongoId(),
    check('id').custom(existId),
    controlCamposResult,
  ],

  deleteFunction
);

module.exports = router;
