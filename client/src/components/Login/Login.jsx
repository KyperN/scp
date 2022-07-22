import { Alert, Button, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import env from 'react-dotenv';
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      axios
        .post(`${env.SERVER_URL}/login-user`, {
          userName: userName,
          password: password,
        })

        .then((res) =>
          dispatch({ type: 'USER_LOGGED_IN', payload: res.data.user })
        )
        .then((res) => {
          console.log(res);
          navigate('/tasks');
        })
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
    }, 1000);
  };

  return (
    <div>
      <form action="submit">
        <TextField
          onChange={handleUserName}
          value={userName}
          label="Username"
          id="outlined-basic"
          variant="outlined"
        />
        <TextField
          value={password}
          type="password"
          onChange={handlePassword}
          label="Password"
          id="outlined-basic"
          variant="outlined"
        />
        <Link style={{ textDecoration: 'none' }} to="/home">
          <Button
            onClick={handleLogin}
            disabled={userName === '' || password === ''}
            style={{ marginTop: 25 }}
            variant="contained">
            Login
          </Button>
        </Link>
        {status.message === '' ? null : (
          <Alert severity="error">{status.message}</Alert>
        )}
      </form>
    </div>
  );
}
