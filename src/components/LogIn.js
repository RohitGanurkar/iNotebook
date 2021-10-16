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
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1ZGU2YmFiMDgzZjBjOWMzYzE5ZTE0In0sImlhdCI6MTYzMzU0MzkwMn0.Pdb98-804Qj0hyKSV6MYYQJn9WGu8t1w-viNXE35ilQ"
            },
            body: JSON.stringify({ email: authentication.email, password: authentication.password })
        });
        const json = await response.json();
        console.log(json)
        if (json.success) { 
            localStorage.setItem('token' , json.authentication);
            // Redirect to homepage
            history.push("/")
            showAlert("Logged In " , "primary")
        }
        else {
            showAlert("Username or Password are invalid" , "danger")
        }

    }
    return (
        <div>
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
