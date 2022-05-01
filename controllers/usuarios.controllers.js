const { response } = require('express');

const getFunction = (req, res = response) => {
  //query params
  const params = req.query;
  res.json({
    message: 'get API',
    params
  });
};

const putFunction = (req, res = response) => {
  const id = req.params.id;
  res.json({
    message: ' put API',
    id,
  });
};

const postFunction = (req, res = response) => {
  const { body } = req;
  res.json({
    message: 'post API',
    body,
  });
};

const deleteFunction = (req, res = response) => {
  res.json({
    message: 'delete API',
  });
};

module.exports = {
  getFunction,
  putFunction,
  postFunction,
  deleteFunction,
};
