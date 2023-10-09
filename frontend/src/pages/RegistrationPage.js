import React, { useState } from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import account from '../services/account-service';
import { useNavigate } from 'react-router-dom';

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

export default function RegistrationPage() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigate();

  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    const response = await account.register({ username, password });
    console.log(response);
    if(response.success){
      alert('Registration success');
      navigation("/");
    }
  };

  return (
    <Container className={classes.root}>
      <Box component="form" className={classes.form} noValidate autoComplete="off">
        <TextField id="username" label="Username/Email" variant="outlined" margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField id="password" label="Password" type="password" variant="outlined" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <TextField id="confirm-password" label="Confirm Password" type="password" variant="outlined" margin="normal" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleRegistration}>
          Register
        </Button>
      </Box>
    </Container>
  );
}
