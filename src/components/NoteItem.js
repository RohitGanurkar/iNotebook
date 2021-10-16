import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

export default function NoteItem(props) {
    // Props coming from [Notes] Component
    const {note , updateNote} = props
    
    //for Alert
    const getContext = useContext(NoteContext);
    const { deleteNote , showAlert } = getContext;
    
    return (
        <div className="col-md-4 my-2">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <h6 className="card-text">{note.tag}</h6>
                    <i className="bi bi-trash-fill mx-2" onClick={()=>{deleteNote(note._id);showAlert("The Note is Deleted from Your NootBook" , "success")}}></i>
                    <i className="bi bi-pencil-square mx-2" onClick={()=>{updateNote(note)}} ></i>
                </div>
            </div>
        </div>
    )
}
