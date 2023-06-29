/* import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const ShowTickets = () => {
  const { user_id } = useParams();
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/user/${user_id}/tickets`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`, // Include the token in the request headers
          },
        });

        const data = await res.data;
        if (data.status === 200) {
          console.log(data.tickets);
          // Process the tickets data
        } else {
          console.log('Failed to fetch tickets:', data.error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTickets();
  }, [user_id, cookies.token]);

  return (
    <div>
      <h1>User Tickets Page</h1>
      <h2>Hello {user_id}</h2>
    </div>
  );
};

export default ShowTickets;


 */

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Navbar from "./Navbar";

const ShowTickets = () => {
  const { user_id } = useParams();
  const [cookies] = useCookies(["token"]);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/user/${user_id}/tickets`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`, // Include the token in the request headers
            },
          }
        );

        const data = await res.data;
        if (data.status === 200) {
          setTickets(data.tickets);
        } else if (data.status === 403) {
          navigate("/unauthorized");
        } else {
          navigate("/unauthorized");
        }
      } catch (error) {
        navigate("/unauthorized");
      }
    };

    fetchTickets();
  }, [user_id, cookies.token, navigate]);

  const sortedTickets = tickets.sort((a, b) => {
    if (a.resolved === b.resolved) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return a.resolved ? 1 : -1;
  });

  return (
    <div>
      <Navbar />
      <Container maxWidth="md">
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          My Tickets
        </Typography>
        {tickets.length === 0 ? (
          <Typography variant="body1" align="center">
            You have not created any tickets yet.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Issue
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Classification
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Channel
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Date/Time
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Resolved
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>{ticket.issue}</TableCell>
                    <TableCell>{ticket.classification}</TableCell>
                    <TableCell>{ticket.channel}</TableCell>
                    <TableCell>
                      {new Date(ticket.createdAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </TableCell>
                    <TableCell>{ticket.resolved ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </div>
  );
};

export default ShowTickets;
