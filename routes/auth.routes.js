const { Router } = require('express');
const { check } = require('express-validator');

const { controlCamposResult } = require('../middlewares/control.campos');
const { loginPost } = require('../controllers/auth.controllers');


const router = Router();

router.post(
  '/login',
  [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),

    controlCamposResult,
  ],
  loginPost
);

module.exports = router;
