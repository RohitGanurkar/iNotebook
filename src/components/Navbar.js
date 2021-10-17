import React, { useEffect } from 'react'
import { Link , useLocation , useHistory} from 'react-router-dom'



export default function Navbar() {
    // for highlit navbar content [useLocation used for check current location of a page]
    let location = useLocation();
    useEffect(() => {
        // console.log(location.pathname)
    }, [location]);

    // useHistory use to redirect any link to another
    let history = useHistory();

    const handleOnclick = () =>{
        localStorage.removeItem('token');
        history.push("/login")
    }

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Navbar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active":""}`} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about"? "active":""}`} to="/about">About</Link>
                </li>
            </ul>
            {/* buttons ko change karne k liye */}
            {!localStorage.getItem('token')?<form className="d-flex">
                <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary mx-2" to="/singup" role="button">Singup</Link>
            </form>:<button onClick={handleOnclick} className="btn btn-primary mx-2"> Logout</button>}
            </div>
        </div>
        </nav>
        </>
    )
}
