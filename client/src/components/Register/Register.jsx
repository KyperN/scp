import { Button, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import env from 'react-dotenv';

export default function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({
    success: '',
    message: '',
  });
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${env.SERVER_URL}/register-user`, {
          userName: userName,
          password: password,
        })
        .then((res) =>
          setStatus({
            success: res.data.success,
            message: res.data.message,
          })
        )
        .catch((err) =>
          setStatus({
            message: err.response.data.message,
            success: err.response.data.success,
          })
        );
    } catch (err) {
      return err;
    }

    setUserName('');
    setPassword('');
    setTimeout(() => {
      setStatus({
        success: '',
        message: '',
      });
      navigate('/');
    }, 650);
  };

  return (
    <form action="submit">
      <TextField
        value={userName}
        onChange={handleUserName}
        label="Username"
        id="outlined-basic"
        variant="outlined"
      />
      <TextField
        value={password}
        onChange={handlePassword}
        label="Password"
        id="outlined-basic"
        variant="outlined"
      />
      <Link style={{ textDecoration: 'none' }} to="/home">
        <Button
          onClick={handleRegister}
          disabled={userName === '' || password === ''}
          style={{ marginTop: 25 }}
          variant="contained">
          Register
        </Button>
      </Link>
      {status.message === '' ? null : status.success ? (
        <Alert severity="success">{status.message}</Alert>
      ) : (
        <Alert severity="error">{status.message}</Alert>
      )}
    </form>
  );
}
