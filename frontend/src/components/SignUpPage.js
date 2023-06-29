import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";

const theme = createTheme({
  palette: {
    background: {
      default: "linear-gradient(to bottom, #90caf9, #fff)",
    },
  },
});

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const cookies = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) {
      navigate("/user/1/tickets");
    }
  }, [cookies.token, navigate]);

  const registerUser = async (event) => {
    event.preventDefault();
    const userId = generateUserId();
    try {
      const response = await axios.post(
        "http://localhost:8080/signup",
        {
          userId,
          email,
          name,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (data.error) {
        alert(data.error);
      } else if (data.status === "ok") {
        alert("Your account has been created! Please login.");
        //window.location.href = '/dashboard';
      }

      setEmail("");
      setName("");
      setPassword("");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const generateUserId = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    // Generate the unique code using your preferred algorithm (e.g., UUID, shortid, etc.)
    const uniqueCode = generateUniqueCode();

    const userId = `${year}${month}${day}${uniqueCode}`;

    return userId;
  };

  // Function to generate a unique code using your preferred algorithm
  const generateUniqueCode = () => {
    // Implement your preferred algorithm here to generate a unique code
    // For example, you can use UUID, shortid, or any other library

    // Placeholder implementation using random numbers for demonstration purposes
    const uniqueCode = Math.floor(Math.random() * 10000);

    return uniqueCode;
  };

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
            style={{ background: "white" }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Signup
            </Typography>
            <form onSubmit={registerUser}>
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
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              <Box style={{ textAlign: "center" }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ width: "50%", mx: "auto", mt: 2, borderRadius: "1rem" }}
                >
                  Submit
                </Button>
              </Box>
            </form>
            <Typography variant="body2" align="center" mt={2}>
              Already registered? <Link to="/">Login</Link>
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default SignUpPage;
