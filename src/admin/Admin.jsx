import React from "react";
import { AdminSideData } from "../helpers/AdminSideData";
import "../styles/Admin.css";
//import AdminNavbar from "../components/AdminNavbar";

function Admin() {
  return (

    <div className="adminSide">

      {/*<Link to="/Create">Edit Something</Link>
         verifies if data is going though */}
      {Array.isArray(AdminSideData) && AdminSideData.length > 0 ? (
      <ul className="SidebarLeft">
       
               <p>Select an option to edit:</p>
               {AdminSideData.map((val, key) => (
            <li 
            key={key}
            className={`row ${val.title === "logout" ? "logout" : ""}`}
            id={window.location.pathname === val.link ? "active" : ""}
            onClick={() =>{
                window.location.pathname = val.link;
            }}
           >

            <div id="icon"> {val.icon}</div>
            <div id="title"> {val.title}</div>
        
           </li>
       
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
   <div className="adminRightSide">
      <p>placeholder until backend is connected so that we can make changes here</p>
      <p>for now the sideleft reroutes to the orignal pages</p>
      <p> to get to admin page put http://localhost:3000/admin/Admin</p>
    </div>

    </div>

   
  );
}

export default Admin;