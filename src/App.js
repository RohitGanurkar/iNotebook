import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import { useState } from "react";
import LogIn from "./components/LogIn";
import SingUp from "./components/SingUp";




function App() {
  const [alert, setalert] = useState(true)
  setTimeout(() => {setalert(false)}, 3000);
  
  return (
    <>
    <NoteState>
      <Router>
      <Navbar/>
      <Alert Alert={alert}/>
      <div className="container">
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route exact path="/singup">
            <SingUp />
          </Route>
      </Switch>
      </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;

