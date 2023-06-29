import React from "react";
import { facts } from "../extra_files/facts.js";
import { Typography } from "@mui/material";

const UnAuth = () => {
  const randomIndex = Math.floor(Math.random() * facts.length);
  const randomFact = facts[randomIndex];

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
      <Typography variant="h4" align="center">
        Did you know?
        <br />
        {randomFact}
      </Typography>
    </div>
  );
};

export default UnAuth;
