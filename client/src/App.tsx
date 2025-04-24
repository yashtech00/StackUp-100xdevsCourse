import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';  
import Home from './Pages/Home';  
import { useQuery } from '@tanstack/react-query';  
import axios from 'axios';  
import { SideBar } from './Components/SideBar';  
import Dashboard from './Pages/Dashboard';  
import Login from './Pages/Login';  
import Signup from './Pages/Signup';  
import Course from './Pages/Course';  

// Admin Pages  
import AdminCourse from './Pages/Admin/AdminCourse';  

import AdminDetailCourse from './Pages/Admin/AdminDetailCourse';  
import { useAuth } from './hooks';

function UserLayout({ children }: { children: React.ReactNode }) {  
  return (  
    <div className="flex w-full min-h-screen">  
      <SideBar />  
      <main className="flex-grow p-4">  
        {children}  
      </main>  
    </div>  
  );  
}  

function AdminLayout({ children }: { children: React.ReactNode }) {  
  return (  
    <div className="min-h-screen p-4">  
      {children}  
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

  const isAdmin = authUser?.role === 'admin';  

  return (  
    <BrowserRouter>  
      <div className="bg-black text-white min-h-screen">  
        <Routes>  
          {/* Admin Routes wrapped in AdminLayout */}  
          <Route path="/login" element={<AdminLayout><Login /></AdminLayout>} />  
          <Route path="/admin" element={isAdmin ? <AdminLayout><AdminCourse /></AdminLayout> : <Navigate to="/" />} />
          <Route path="/admin/course/:courseId" element={isAdmin ? <AdminLayout><AdminDetailCourse /></AdminLayout> : <Navigate to="/login" />} />  

          {/* User routes wrapped in UserLayout if authenticated */}  
          <Route path="/" element={authUser && !isAdmin ? <UserLayout><Dashboard /></UserLayout> : <Home />} />  
          <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/dashboard" />} />  
          <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/dashboard" />} />  
          <Route path="/dashboard" element={authUser && !isAdmin ? <UserLayout><Dashboard /></UserLayout> : <Navigate to="/" />} />  
          <Route path="/course/:courseId" element={authUser && !isAdmin ? <UserLayout><Course /></UserLayout> : <Navigate to="/" />} />  
        </Routes>  
      </div>  
    </BrowserRouter>  
  );  
}  

export default App;  