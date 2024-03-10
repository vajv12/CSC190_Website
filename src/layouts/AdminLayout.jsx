// layout for admin only
import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer.jsx';


const AdminLayout = ({ children }) => {
  /*checks to see if it goes through */
  console.log('Rendering AdminLayout');
  return(
  <div>
   <AdminNavbar />
    {children}
    <Footer />
  </div>
  );
};
export default AdminLayout;
