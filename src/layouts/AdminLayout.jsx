// layout for admin only
import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AdminFooter from '../components/AdminFooter.jsx';


const AdminLayout = ({ children }) => {
  /*checks to see if it goes through */
  console.log('Rendering AdminLayout');
  return(
  <div>
   <AdminNavbar />
    {children}
    <AdminFooter />
  </div>
  );
};
export default AdminLayout;
