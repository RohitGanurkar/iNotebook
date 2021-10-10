import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

export default function Notes() {
  // FOR use noteContext :- NoteState se sab yha aa jata hai fir use use kar skte hai
  const getContext = useContext(NoteContext);
  const { notes } = getContext;
  return (
    <>
    <AddNote/>
    
    <div className="row my3">
      <h2>Your Notes here</h2>
      {notes.map((print) => {
        return <NoteItem key={print._id} note={print} />;
      })}
    </div>
    </>
  );
}
