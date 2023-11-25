const mongoose = require('mongoose')
const notesSchema = new mongoose.Schema({
  content: {
    type: String,
  },
})
const note = mongoose.model('note', notesSchema)
module.exports = note
