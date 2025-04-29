import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';  
import Home from './Pages/User/Home';  
import { SideBar } from './Components/SideBar';  
import Dashboard from './Pages/User/Dashboard';  
import Login from './Pages/User/Login';  
import Signup from './Pages/User/Signup';  
import Course from './Pages/User/Course';   
import { useAuth } from './hooks';
import Purchased from './Pages/User/Purchased';
import Help from './Pages/User/Help';


function UserLayout({ children }: { children: React.ReactNode }) {  
  return (  
    <div className="relative flex w-full min-h-screen ">  
      <SideBar /> 
      <main className='flex-grow overflow-y-auto p-4 '>
        {children} 
        </main>
    </div>  
  );  
}  

function App() {  
  
  const { authUser, isLoading } = useAuth();

  if (isLoading) { 
    
    return (  
      <div className="flex justify-center items-center h-screen">  
        Loading...  
      </div> 
      
    );  
  }  
  return (  
    <BrowserRouter>  
      <div className="bg-black text-white min-h-screen ">  
        <Routes>  
          <Route path="/" element={authUser  ? <UserLayout><Dashboard /></UserLayout> : <Home />} />  
          <Route path="/login" element={!authUser ? <Login/> : <Navigate to="/dashboard"/>} />  
          <Route path="/signup" element={!authUser ? <Signup/> : <Navigate to="/dashboard"/>} />  
          <Route path="/dashboard" element={authUser  ? <UserLayout><Dashboard/></UserLayout> : <Navigate to="/"/>} />  
          <Route path="/purchase" element={authUser  ? <UserLayout><Purchased/></UserLayout> : <Navigate to="/"/>} /> 
          <Route path="/help" element={authUser  ? <UserLayout><Help/></UserLayout> : <Navigate to="/" />}/> 
          <Route path="/course/:courseId" element={authUser  ? <UserLayout><Course/></UserLayout> : <Navigate to="/"/>} />  
        </Routes>  
      </div>  
    </BrowserRouter>  
  );  
}  

export default App;  