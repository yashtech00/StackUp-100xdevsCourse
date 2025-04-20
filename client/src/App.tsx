import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


function App() {

  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await axios.get("http://localhost:8001/user/me");
        return res.data.user;
      } catch (e) {
        return null
      }
    },
    retry:false,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading....
      </div>
    )
  }


  return (
    
    <BrowserRouter>
      {authuser && <SideBar/>}
      <Routes>
        <Route path='/' element={authUser ? <Dashboard /> :<Home/>} />
        <Route path="/login" element={!authUser ? <Login /> : <Dashboard />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Dashboard />} />
        <Route path='/dashboard' element={!authUser ? <Dashboard /> : <Home />} />
        
    </Routes>
    </BrowserRouter>
  );
}

export default App;
