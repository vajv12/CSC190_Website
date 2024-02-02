import React from "react";
import { Link } from "react-router-dom";

export default function Admin(){
    // The Create Button will link to creating Events, News, or New posts
    // The Admin page will have the ability to edit other pages upload photos
    // The admin page will need to be account secured. 
    return(
        <>
        <h1> admin </h1>
                
                <button><Link to="/Create"> Create Something </Link></button>
            
            
        </>
    )
}