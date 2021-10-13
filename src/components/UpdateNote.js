import React, { useRef , useContext }  from 'react'
import NoteContext from "../context/notes/noteContext";

export default function UpdateNote(props) {
  
  const{giveRef, editNote , setEditNote} = props ;

  // FOR use noteContext :- NoteState se sab yha aa jata hai fir use use kar skte hai
  const getContext = useContext(NoteContext);
  const { updateNote} = getContext;

  const toClose = useRef(null);

    // to track Input filed
    const onChange = (e)=>{
      setEditNote({...editNote, [e.target.name]: e.target.value})
    }

    // when Savechanges btn clicked
    const handleClick = (e)=>{
      updateNote(editNote.id,editNote.Etitle,editNote.Edescription,editNote.Etag)
      toClose.current.click();
    }

    return (
        <>
        <button ref={giveRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Update Note
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="Etitle" aria-describedby="emailHelp" value={editNote.Etitle} name="Etitle" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" >Descrition</label>
                    <input type="text" className="form-control" id="Edescription" value={editNote.Edescription} name="Edescription" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" >Tag</label>
                    <input type="text" className="form-control" id="Etag" value={editNote.Etag} name="Etag" onChange={onChange}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
              </form>
              </div>
              <div className="modal-footer">
                <button  ref={toClose}  type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleClick} >Save changes</button>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}
