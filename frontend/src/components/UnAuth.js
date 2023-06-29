import React from "react";
import { facts } from "../extra_files/facts.js";
import { Typography, Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UnAuth = () => {
  const buttonStyles = {
    backgroundColor: "#F9421C",
    borderRadius: 3,
    color: "white",

    "&:hover": {
      backgroundColor: "#F9836A",
      borderRadius: 5,
    },
  };
  const randomIndex = Math.floor(Math.random() * facts.length);
  const randomFact = facts[randomIndex];
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (cookies.token) {
      try {
        const response = await axios.post(
          "http://localhost:8080/verify-token",
          { token: cookies.token }
        );

        if (response.status === 200) {
          const { userId } = response.data;
          navigate(`/user/${userId}/tickets`); // Replace `navigate` with your actual navigation logic
        }
      } catch (error) {
        console.error("Failed to verify token:", error);
      }
    } else {
      // User is not logged in, navigate to login page
      navigate("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h3" sx={{ color: "red" }}>
        You are not allowed to access this page.
      </Typography>
      <Button onClick={handleClick} sx={buttonStyles}>
        {cookies.token ? (
          <span>Show my tickets</span>
        ) : (
          <span>Please login</span>
        )}
      </Button>
      <Typography variant="h4" align="center">
        Did you know?
        <br />
        {randomFact}
      </Typography>
    </div>
  );
};

export default UnAuth;
