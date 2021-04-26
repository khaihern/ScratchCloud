const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  collections: { type: Array }
})

module.exports = mongoose.model('Project', projectSchema);