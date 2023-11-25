const note = require('./../models/notesModel')

// get all notes .......
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await note.find()
    res.status(201).json({
      status: 'success',
      data: {
        notes,
      },
    })
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err })
  }
}

// delete all notes .....
exports.deleteAllNotes = async (req, res) => {
  try {
    await note.deleteMany()
    res.status(201).json({
      status: 'success',
      data: 'all deleted',
    })
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err })
  }
}

// add  a note .....
exports.addNote = async (req, res) => {
  try {
    console.log(req.body)
    const newNote = await note.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        newNote,
      },
    })
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err })
  }
}

// delete note by id .......
exports.deleteNote = async (req, res) => {
  try {
    await note.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: 'success',
      data: null,
    })
  } catch (e) {
    res.status(400).json({ status: 'fail', message: err })
  }
}

// upadate note by id ......

exports.updateNote = async (req, res) => {
  try {
    const newNote = await note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({
      status: 'success',
      data: {
        newNote,
      },
    })
  } catch (e) {
    res.status(400).json({ status: 'fail', message: e })
  }
}

// get unique note by id .....
exports.getNoteById = async (req, res) => {
  try {
    const newNote = await note.findById(req.params.id)
    res.status(200).json({
      status: 'success',
      data: {
        newNote,
      },
    })
  } catch (e) {
    res.status(400).json({ status: 'fail', message: e })
  }
}
