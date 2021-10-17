import React, { useState , useContext } from 'react'
import { useHistory } from 'react-router-dom'
import NoteContext from '../context/notes/noteContext';

export default function LogIn() {
    // for alert
    const getContext = useContext(NoteContext);
    const { showAlert} = getContext;

    // useHistory use to redirect any link to another
    let history = useHistory();

    const [authentication, setAuthentication] = useState({ email: "", password: "" })

    // to track Input filed
    const onChange = (e) => {
        setAuthentication({ ...authentication, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/loginuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: authentication.email, password: authentication.password })
        });
        const json = await response.json();
        if (json.success) { 
            localStorage.setItem('token' , json.authToken);
            showAlert("Logged In " , "primary")
            // Redirect to homepage
            history.push("/")
        }
        else {
            showAlert("Username or Password are invalid" , "danger")
        }

    }
    return (
        <div>
            <h2>Log in to Access Your Notes</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={authentication.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={authentication.password} onChange={onChange} id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
            </form>
        </div>
    )
}
