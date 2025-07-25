import axios from 'axios';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';


const NoteDetailPage = () => {

  const [note, setNote] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note?"))  return;

    try {
      await axios.delete(`http:localhost:5000/api/notes/${id}`);
      toast.success("Note Deleted Successfully");
      navigate('/');
    } catch (error) {
      toast.error("Error while Deletig this note")
      console.log("Error in deleteNote function " , error)
      
    }
  }


  const handleSave =async () =>{
    if(!note.title.trim() ||!note.content.trim()){
      toast.error("Make Sure to Enter a title & Content");
      return
    }

    setSaving(true);
    try {
        await axios.put(`http:localhost:5000/api/notes/${id}`, note);
        toast.success("Note Updated Sucessfully!");
        navigate('/');
    }   catch (error) {
      console.log("Error in handleSave functions in noteDetailPage  " , error );
      toast.success("Failed to Update Note");

    } finally{
      setSaving(false)
    }

  }



  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notes/${id}`);
        const data = res.data;
        setNote(res.data)
        toast.success("Successfully Fetch Note Details")
      } catch (error) {
        console.log("Error in Fetching Notes ", error)
        toast.error("Error while fetching Notes Detail")
      }
    }
    fetchNotes();
  }, [id])

  if (isloading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-auto py-8 ">
        <div className="max-w-2xl mx-auto">
          <div className='flex items-center justify-between mb-6'>
            <Link to={"/"} className='btn btn-ghost'>
              <ArrowLeftIcon className='size-5' />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='size-5' />
              Delete Note
            </button>
          </div>

          {/* Only render the form if note is loaded */}
          {note && (
            <>
              <div className='card bg-base-100'>
                <div className='card-body'>
                  <div className='form-control mb-4'>
                    <label className="label">
                      <span className='label-text'>Title</span>
                    </label>
                    <input
                      type="text"
                      placeholder='Note Title'
                      className='input input-bordered '
                      value={note.title}
                      onChange={(e) => setNote({ ...note, title: e.target.value })}
                    />
                  </div>
                  <div className='form-control mb-4 '>
                    <label className='label'>
                      <span className='label-text'>Content</span>
                    </label>
                    <textarea
                      placeholder='write your note here...'
                      className='textarea textarea-bordered h-32'
                      value={note.content}
                      onChange={(e) => setNote({ ...note, content: e.target.value })}
                    />
                  </div>

                  <div className="card-actions justify-end">
                    <button className="btn btn-primary" disabled={saving}
                    onClick={handleSave}>
                          {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>


            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage