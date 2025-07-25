import { CloudDownload, PenSquareIcon, TabletSmartphone, Trash2Icon } from 'lucide-react'
import { formatDate } from '../../../BackEnd/src/lib/utils'
import React from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import toast from 'react-hot-toast'

const NoteCard = ({note, noteKey, setNotes}) => {

  const navigate = useNavigate();
  const handleDelete = async (e , id) =>{
    e.preventDefault();


    if(!window.confirm("Are You Sure you Want to Delete this?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`)
      setNotes((prev) => prev.filter((note) => note._id !== id)) ; //after deleting updating the ui 
      toast.success("Note Deleted Successfully!");
    } catch (error) {
      toast.error("Can't Delete the Note")
      console.log("Error while Deleting Note " , error)
    }
    
  }


  return (
    <Link
      to={`note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-primary"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard