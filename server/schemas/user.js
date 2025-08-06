const mongoose = require('mongoose');

// the schema how user data is stored 

const userSchema = new mongoose.Schema({
  name: { type: String, reequired: true},
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
