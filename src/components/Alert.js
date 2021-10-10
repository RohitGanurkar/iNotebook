import React from 'react'

export default function Alert(props) {
    return (
        <div style={{height: "40px"}}>
            {props.Alert && <div className="alert alert-primary" role="alert" >
            This is AmazingReact Course Give it a click if you like.
            </div>}
        </div>
    )
}
