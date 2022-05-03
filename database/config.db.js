const mongoose = require('mongoose');
require('dotenv');

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
  } catch (error) {
    throw new Error(console.log(`Erron when conect ${error}`));
  }
};

module.exports = {
  dbConection,
};
