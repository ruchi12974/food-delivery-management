import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Home, Dashboard, Analytics } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/hospital-manager' },
    { text: 'Pantry', icon: <Home />, path: '/pantry' },
    { text: 'Delivery', icon: <Analytics />, path: '/delivery' },
  ];

  return (
    <Box sx={{ width: 250, height: '100vh', background: '#f4f4f4', padding: '1rem' }}>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
