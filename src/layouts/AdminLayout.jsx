// layout for admin only
import React from 'react';
import AdminNavbar from '../components/AdminNavbar';


const AdminLayout = ({ children }) => {
  /*checks to see if it goes through */
  console.log('Rendering AdminLayout');
  return(
  <div>
   <AdminNavbar />
    {children}
  </div>
  );
};
export default AdminLayout;
