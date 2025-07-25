import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import NoteCard from '../components/NoteCard'
import NotesNotFound from '../components/NotesNotFound'
import axios from "axios"
import toast from 'react-hot-toast'

const HomePage = () => {
  const [isRateLimited , setisRateLimited] = useState(false);
  const [notes , setNotes] = useState([]);
  const [loading , setLoading] = useState(true)


  useEffect(()=>{
    const fetchNotes = async() =>{
     try {
      const res = await axios.get("http://localhost:5000/api/notes");
      setNotes(res.data);
      setisRateLimited(false)
      console.log(res.data); 
      
     } catch (error) {
      console.log("Error While Fetching data " , error);
      if(error.response?.status === 429){
        setisRateLimited(true);
      }else{
        toast.error("Failed to Load Notes ")
      }
     } finally{
      setLoading(false)
     }
    }

    fetchNotes(); 
  }, [])
  return (
    <div className='min-h-screen'>
        <Navbar/> 
        {isRateLimited && <RateLimitedUI/>}

        <div className='max-w-7xl mx-auto p-4 mt-6'>
          {loading && <div className='text-center text-primary py-10'>Loading...</div>}
          
          {notes.length === 0 && !isRateLimited && <NotesNotFound/>}

          {notes.length > 0 && !isRateLimited && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {notes.map((note) => (
                <NoteCard note={note} noteKey={note._id} key={note._id} setNotes={setNotes} />
              ))}

            </div>
          )}
        </div>

    </div>
  )
}

export default HomePage