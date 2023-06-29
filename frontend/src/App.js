import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import NewTicket from './components/NewTicket';
import ShowTickets from './components/ShowTickets';
import UnAuth from './components/UnAuth';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user/:user_id/createticket" element={<NewTicket />} />
        <Route path="/user/:user_id/tickets" element={<ShowTickets />} />
        <Route path="/unauthorized" element={<UnAuth />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </>
  );
}

export default App;
