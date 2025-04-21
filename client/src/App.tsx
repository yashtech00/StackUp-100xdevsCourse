import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SideBar } from './Components/SideBar';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Signup from './Pages/Signup';


function App() {

  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await axios.get("http://localhost:8001/user/me", { withCredentials: true });
        console.log(res.data.data,"authuser");
        
        return res.data.data;
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
      <div className='bg-black min-h-screen text-white'>
        <div className='flex w-full max-w-6xl'>
          {authUser && <SideBar />}
          <div className='flex-1 '>
      <Routes>
        <Route path='/' element={authUser ? <Dashboard /> :<Home/>} />
        <Route path="/login" element={!authUser ? <Login /> : <Dashboard />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Dashboard />} />
        <Route path='/dashboard' element={authUser ? <Dashboard /> : <Home />} />
        
            </Routes>
            </div>
          </div>
    </div> 
    </BrowserRouter>
  );
}

export default App;
