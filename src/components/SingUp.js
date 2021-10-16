import React, { useState , useContext } from 'react'
import { useHistory } from 'react-router-dom'
import NoteContext from "../context/notes/noteContext";

export default function SingUp() {
    // for Alert
    const getContext = useContext(NoteContext);
    const { showAlert} = getContext;

    // useHistory use to redirect any link to another
    let history = useHistory();

    const [authentication, setAuthentication] = useState({name:"", email: "", password: "" ,cpassword:""})

    // to track Input filed
    const onChange = (e) => {
        setAuthentication({ ...authentication, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const {name ,email ,password} = authentication ;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name , email , password })
        });
        const json = await response.json();
        console.log(json)
        if (json.success) { 
            localStorage.setItem('token' , json.authentication);
            // Redirect to homepage
            history.push("/")
            showAlert("your Ragisteration is Successfully done" , "success")
        }
        else {
            showAlert("fill the full Details" , "danger")
        }
    }

    return (
        <div>
            <div className="container">
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name"  onChange={onChange} id="exampleInputName" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email"  onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChange} id="exampleInputPassword1" required minLength="5" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleCInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" onChange={onChange} id="exampleCInputPassword1" required minLength="5" />
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
            </form>
        </div>
        </div>
    )
}
