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
        title:"home",
        icon: <HomeIcon />,
        link:"pages/pages/Home"
    },

    {
        title:"product",
        icon:<InventoryIcon />,
        link:"/pages/pages/product"
    },

    {
        title:"info",
        icon:<InfoIcon />,
        link:"/Sacramento"
    },

    {
        title:"location page",
        icon:<EditLocationAltIcon />,
        link:"/pages/pages/Locations"
    },
    {
        title:"about",
        icon:<EditIcon />,
        link:"pages/pages/About"
    },
    {
        title:"accounts",
        icon:<AccountBoxIcon />,
        link:"pages/pages/Login"
    },

    {
        title:"email",
        icon:<EmailIcon />,
        link:"pages/pages/Contact"
    },
   
    {
        title:"logout",
        icon:<LogoutIcon />,
        link:"pages/pages/Login"
    },

]

