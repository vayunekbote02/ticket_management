import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useParams } from "react-router-dom";

const Navbar = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "token=; path=/;";
    navigate("/");
  };

  return (
    <AppBar position="floating">
      <Toolbar>
        <Typography
          variant={{ lg: "h6", xs: "h9" }}
          component="div"
          style={{
            marginRight: "auto",
            fontFamily: "Helvetica",
          }}
        >
          Helpdesk Ticketing System
        </Typography>
        <Button color="inherit">
          <AddBoxOutlinedIcon />
          <Link
            to={`/user/${user_id}/tickets`}
            relative="path"
            style={{ textDecoration: "none", color: "white" }}
          >
            View Tickets
          </Link>
        </Button>
        <Button color="inherit">
          <ListOutlinedIcon />
          <Link
            to={`/user/${user_id}/createticket`}
            relative="path"
            style={{ textDecoration: "none", color: "white" }}
          >
            Create Ticket
          </Link>
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
