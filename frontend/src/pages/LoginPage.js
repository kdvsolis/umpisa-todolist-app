import React, { useState } from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import account from '../services/account-service';
import { useNavigate } from 'react-router-dom';
import { storageHandler } from '../utils/storage_handler';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default function LoginPage() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await account.login({ username, password });
    console.log(response);
    if(response.success){
      storageHandler.localStorageSet('token', response.result.token);
      navigate("/");
    }
  };

  return (
    <Container className={classes.root}>
      <Box component="form" className={classes.form} noValidate autoComplete="off">
        <TextField id="username" label="Username" variant="outlined" margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField id="password" label="Password" type="password" variant="outlined" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Container>
  );
}
