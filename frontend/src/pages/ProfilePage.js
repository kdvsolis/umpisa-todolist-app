import React, { useState, useEffect } from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import account from '../services/account-service';

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

export default function ProfilePage() {
  const classes = useStyles();
  const [username, setUsername] = useState('johndoe');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
      const fetchUser = async () => {
          const response = await account.getUser();
          if (response.success) {
            console.log(response)
              setUsername(response.result.user.username);
          } else {
              console.error(response.reason);
          }
      };
      fetchUser();
  }, []);

  const handleSave = async () => {
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const body = {
      password: password
    };

    const response = await account.updateUser(body);

    if (response.success) {
        alert('Profile updated successfully!');
    } else {
        console.error(response.reason);
        alert('Failed to update profile. Please try again.');
    }
  };


  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "20px" }}>
        <Container className={classes.root}>
        <Box component="form" className={classes.form} noValidate autoComplete="off">
            <TextField id="username" label="Username" variant="outlined" margin="normal" disabled={true} value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextField id="password" label="Change Password" type="password" variant="outlined" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
            <TextField id="confirm-password" label="Confirm Password" type="password" variant="outlined" margin="normal" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <Button variant="contained" color="primary" onClick={handleSave}>
            Save
            </Button>
        </Box>
        </Container>
    </div>
  );
}
