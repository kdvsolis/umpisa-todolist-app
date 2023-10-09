import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, useMediaQuery, Menu, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import { storageHandler } from '../utils/storage_handler';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: '16px',
  },
  title: {
    flexGrow: 1,
  },
});

export default function HeaderBar() {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const token = storageHandler.localStorageGet('token');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRedirect = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
            <FontAwesomeIcon icon={faListAlt} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Todo List App
          </Typography>
          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={handleMenu}>
                <MenuIcon />
              </IconButton>
              <Menu id="menu-appbar" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {!token && (
                  <Menu id="menu-appbar" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={() => handleRedirect('/registration')}>Register</MenuItem>
                    <MenuItem onClick={() => handleRedirect('/login')}>Login</MenuItem>
                  </Menu>
                )}
                {token && (
                  <Menu id="menu-appbar" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={() => handleRedirect('/profile')}>Profile</MenuItem>
                    <MenuItem onClick={() => handleRedirect('/')}>Todo List</MenuItem>
                    <MenuItem onClick={() => {
                      storageHandler.localStorageDelete('token');
                      handleRedirect('/login');
                    }}>Logout</MenuItem>
                  </Menu>
                )}
              </Menu>
            </>
          ) : (
            <>
            {token && (
              <>
                <Button color="inherit" onClick={() => handleRedirect('/profile')}>Profile</Button>
                <Button color="inherit" onClick={() => handleRedirect('/')}>Todo List</Button>
                <Button color="inherit" onClick={() => {
                  storageHandler.localStorageDelete('token');
                  handleRedirect('/login');
                }}>Logout</Button>
              </>
            )}
            {!token && (
              <>
                <Button color="inherit" onClick={() => handleRedirect('/registration')}>Register</Button>
                <Button color="inherit" onClick={() => handleRedirect('/login')}>Login</Button>
              </>
            )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
