/*helps to create tab for admin page using arrays*/
import React from 'react';

import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import InfoIcon from '@mui/icons-material/Info';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';import EditIcon from '@mui/icons-material/Edit';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';


export const AdminSideData =[
    {
        title:"Home",
        icon: <HomeIcon />,
        link:"/pages/Home"
    },

    {
        title:"Product",
        icon:<InventoryIcon />,
        link:"/admin/Adproduct"
    },
    {
        title:"Events",
        icon:<LogoutIcon />,
        link:"/admin/Addevents"
    },

    {
        title:"Store Info",
        icon:<InfoIcon />,
        link:"/pages/Home"
    },

    {
        title:"Location Hours",
        icon:<EditLocationAltIcon />,
        link:"/pages/About"
    },
    {
        title:"About",
        icon:<EditIcon />,
        link:"/pages/About"
    },
    {
        title:"Accounts",
        icon:<AccountBoxIcon />,
        link:"/pages/Home"
    },

    {
        title:"Email",
        icon:<EmailIcon />,
        link:"/pages/Home"
    },
   
    {
        title:"Back to Home",
        icon:<LogoutIcon />,
        link:"/pages/Home"
    },

]

