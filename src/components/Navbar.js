import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Logo from '../assets/logo.svg';

export default function Navbar({ user, onLogout }) {
  return (
    <AppBar position="sticky" elevation={3} sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <Avatar src={Logo} alt="Logo" sx={{ mr: 2, width: 48, height: 48 }} />
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Meme Generator
        </Typography>
        {user && (
          <>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              {user.name}
            </Typography>
            <Button color="secondary" variant="contained" onClick={onLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}