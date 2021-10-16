import React from 'react'
import { useContext, useState } from 'react';
import NoteContext from "../context/notes/noteContext";

export default function AddNote() {
    // FOR use noteContext :- NoteState se sab yha aa jata hai fir use use kar skte hai
    const getContext = useContext(NoteContext);
    const { addNote,showAlert } = getContext;

    // temprery state for only this Componet
    const [note, setNote] = useState({title:"",description:"",tag:""})

    // when submit btn clicked
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note);
        setNote({title:"",description:"",tag:""})
        showAlert("The Note is Added in Your NootBook" , "success")
    }

    // to track Input filed
    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value})
    }
    
    return (
        <div>
            <div className="container my-3">
            <h2>Add a Note </h2>
            <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name="title" value={note.title} onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label" >Descrition</label>
                <input type="text" className="form-control" id="description"  name="description" value={note.description} onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label" >Tag</label>
                <input type="text" className="form-control" id="tag"  name="tag" value={note.tag} onChange={onChange}/>
            </div>
            <button disabled={note.title.length < 5||note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
            </div>
        </div>
    )
}
