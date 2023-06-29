import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
//import Navbar from "./Navbar";
//import { TicketContext } from "../contexts/TicketContext";
import { useCookies } from 'react-cookie';
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import Navbar from "./Navbar";

export default function NewTicket() {
  const { user_id } = useParams();
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/user/${user_id}/authenticate`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`
          }
        });
        const data = await res.data;
        if (data.status === 200) {
          navigate(`/user/${user_id}/createticket`);
        } else if (data.status === 403) {
          navigate('/unauthorized');
        }
        // Write the code to response from backend
      } catch (error) {
        navigate('/unauthorized');
      }
    }

    checkAuthentication();
  }, [user_id, cookies.token, navigate])

  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [remarks, setRemarks] = useState("");
  const [phone, setPhone] = useState("");
  const [landline, setLandline] = useState("");
  const [classification, setClassification] = useState("");
  const [channel, setChannel] = useState("");
  const [status, setStatus] = useState(null);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date();
    const newComplaint = {
      user_id: user_id, //user_id is coming from the URL itself and then it is passed to the backend 
      name: name,
      email: email,
      phoneNumber: phone,
      landlineNumber: landline || "",
      issue: issue || "",
      classification: classification || "",
      channel: channel || "",
      remarks: remarks || "",
      createdAt: currentDate.toISOString(),
      resolved: false,
      priority: "low",
      assignedEngineer: ""
    };

    try {
    const response = await axios.post(`http://localhost:8080/user/${user_id}/createticket`, 
    newComplaint, 
    {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    }
    );
    const data = await response.data;
    if (data.status === 200) {
        setStatus("success");
        alert("Your ticket has been successfully created.")
        // Handle the created ticket
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus(error);
    }
    // setUsersComplaints([...usersComplaints, newComplaint]);
    // Reset the form after submission
    setName("");
    setEmail("");
    setPhone("");
    setLandline("");
    setIssue("");
    setClassification("");
    setChannel("");
    setRemarks("");
  };

  return (
    <>
      <Navbar />
      {status === "error" ? (
        <Typography variant="h4" color="error">
          You are not authorized to access this page.
        </Typography>
      ) : (
        <Container maxWidth="md">
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Create Ticket
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                type="tel"
                label="Phone Number"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="tel"
                label="Landline Number"
                fullWidth
                value={landline}
                onChange={(e) => setLandline(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Issue</InputLabel>
                <Select
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                >
                  <MenuItem value="Hardware">Hardware</MenuItem>
                  <MenuItem value="Software">Software</MenuItem>
                  <MenuItem value="Networking">Networking</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Classification</InputLabel>
                <Select
                  value={classification}
                  onChange={(e) => setClassification(e.target.value)}
                >
                  <MenuItem value="Question">Question</MenuItem>
                  <MenuItem value="Problem">Problem</MenuItem>
                  <MenuItem value="Feature">Feature</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Channel</InputLabel>
                <Select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                >
                  <MenuItem value="Phone">Phone</MenuItem>
                  <MenuItem value="Email">Email</MenuItem>
                  <MenuItem value="Web">Web</MenuItem>
                  <MenuItem value="Chat">Chat</MenuItem>
                  <MenuItem value="Forums">Forums</MenuItem>
                  <MenuItem value="Feedback Widget">Feedback Widget</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Remarks"
                fullWidth
                multiline
                rows={4}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      )}
    </>
  );
}
