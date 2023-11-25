const express = require('express')
const {
  getAllNotes,
  addNote,
  deleteNote,
  deleteAllNotes,
  updateNote,
  getNoteById,
} = require('../controller/notesController')

const router = express.Router()

router.route('/').get(getAllNotes).post(addNote).delete(deleteAllNotes)

router.route('/:id').delete(deleteNote).patch(updateNote).get(getNoteById)

module.exports = router
