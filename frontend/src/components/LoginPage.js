import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const theme = createTheme({
    palette: {
      background: {
        default: 'linear-gradient(to bottom, #90caf9, #fff)',
      },
    },
  });


const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(event) => {
      event.preventDefault();
      try {
      const res = await axios.post('http://localhost:8080/login', {
          email, 
          password 
        }
          , {
            headers: {
              'Content-Type': 'application/json'
            }
      })
      
      const data = await res.data;
      if (data.status === "ok") {
        //const token = cookies.token;
        //console.log(res.headers['set-cookie'][0]);
        document.cookie = `token=${data.user.token}; path=/`; // Set the token as a cookie
        const userId = data.user.userId;
        navigate(`/user/${userId}/tickets`);
      } else {
        alert('Please check your email and password');
      }
    } catch (err) {
      console.error(err);
    }
  }

    return (
        <>
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        style={{ background: theme.palette.background.default }}
      >
        <Box
          p={4}
          maxWidth={400}
          width="100%"
          bgcolor="background.default"
          borderRadius={8}
          boxShadow={2}
          style={{ background: 'white' }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Box style={{textAlign: "center"}}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: '50%', mx: 'auto', mt: 2, borderRadius: "1rem" }}
            >
              Submit
            </Button>
            </Box>
          </form>
          <Typography variant="body2" align="center" mt={2}>
            Don't have an account? <Link to="/signup">Signup</Link>
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
   
    </>
    );
}

export default LoginPage;