const { validationResult } = require('express-validator');

const controlCamposResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  // es importante para que pase si ese middleware no tiene errores
  next();
};

module.exports = {
  controlCamposResult,
};
