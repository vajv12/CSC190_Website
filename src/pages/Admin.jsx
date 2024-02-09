import React from "react";
import { Link } from "react-router-dom";
import "../styles/Admin.css"
 function Admin() {
    // The Create Button will link to creating Events, News, or New posts
    // The Admin page will have the ability to edit other pages upload photos
    // The admin page will need to be account secured. 
    return(
        <>
        <h1> admin </h1>
                
              <Link to="/Create"> Create Something </Link>
            
            
        </>
    )
}

export default Admin;