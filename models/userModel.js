const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  projects: [Number]
})

module.exports = mongoose.model('User', userSchema);