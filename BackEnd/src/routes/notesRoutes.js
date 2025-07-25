import express from 'express'
import { createNote, deleteNote, getAllNotes, getNotesById, UpdateNote } from '../controllers/notesControllers.js';
const router = express.Router();



router.get('/' , getAllNotes)
router.get('/:id' , getNotesById)


//for creating new notes 
router.post('/' , createNote)


//for updating specific notes 
router.put('/:id' , UpdateNote)


//for deleting a specific note
router.delete('/:id' , deleteNote)




export default router ;