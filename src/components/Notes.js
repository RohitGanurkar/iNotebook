import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import UpdateNote from "./UpdateNote";
import { useHistory } from 'react-router-dom'

export default function Notes() {
  // FOR use noteContext :- NoteState se sab yha aa jata hai fir use use kar skte hai
  const getContext = useContext(NoteContext);
  const { notes, fetchAllNotes } = getContext;

  // useHistory use to redirect any link to another
  let history = useHistory();

  // this will be exicuting befor return
  useEffect(() => {

    if(localStorage.getItem('token')){
      fetchAllNotes();
    }else{
      history.push("/login")
    }
    
  }, [fetchAllNotes])

  // This is use to do any task
  const giveRef = useRef(null);

  const [editNote, setEditNote] = useState({id:"",Etitle:"",Edescription:"",Etag:""})

  const updateNote = (note) => {
    giveRef.current.click();
    setEditNote({id:note._id,Etitle:note.title,Edescription:note.description,Etag:note.tag})
  }
  return (
    <>
    <AddNote/>

    <UpdateNote giveRef={giveRef} editNote={editNote} setEditNote={setEditNote} />
    
    <div className="row my3">
      <h2>Your Notes here</h2>
      {notes.map((print) => {
        return <NoteItem key={print._id} note={print} updateNote={updateNote}/>;
      })}
    </div>
    </>
  );
}
