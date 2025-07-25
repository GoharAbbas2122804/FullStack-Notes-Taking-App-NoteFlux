import Note from "../model/Note.js"

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({createdAt: -1} );
        res.status(200).json(notes)
    } catch (error) {
        console.log("Internal Server Error while Fetching Notes through getAllNotes method ", error)
        res.status(500).json({ message: "Internal Server Error" })

    }
}



export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json({message : "Note created Successfully" , newNote})

    } catch (error) {
        console.log("Error while creating new Note through createNote method ", error);
        res.status(500).send({ message: "Internal Server Error while creating new Note" })

    }
}



export const UpdateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content },
             { new: true }
            );

        if (!updatedNote) return res.status(404).send("Note Not found , Invalid ID!")


        res.status(200).json({ message: "Note Updated Successfully!", updatedNote });

    } catch (error) {
        console.log("Error in updateNote Controller ", error);
        res.status(500).send("Internal Server Error");
    }
}




export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).send("Note Not found , Invalid ID!")

    res.status(200).json({ message: "Note Deleted Successfully" });

    } catch (error) {
        console.log("Error in deleteNote controller " , error);
        res.status(500).send("Error while Deleting Note");
        
    }
}


export const getNotesById = async (req, res) =>{
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message : "Note Note Found!"})
            res.status(200).json(note);
    } catch (error) {
        consolog.log("Error in the getNotesById controller!")
        res.status(500).json({message: "Internal Server Error"})
        
    }
}