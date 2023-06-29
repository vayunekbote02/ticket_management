import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Home() {
    const location = useLocation();

  return (
    <>
        <h1>Hello {location.state.id}! Welcome to home.</h1>
    </>
  )
}
