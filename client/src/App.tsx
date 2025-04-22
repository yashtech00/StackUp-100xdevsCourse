import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import Course from './Pages/Course';
import AdminCourse from './Pages/Admin/AdminCourse';
import AdminLogin from './Pages/Admin/AdminLogin';
import UserLayout from './layouts/UserLayouts';
import AdminLayout from './layouts/AdminLayouts';
import AdminDetailCourse from './Pages/Admin/AdminDetailCourse';


function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const { data: authUser } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await axios.get('http://localhost:8001/user/me', {
          withCredentials: true,
        });
        return res.data.data;
      } catch {
        return null;
      }
    },
    retry: false,
  });

  

  const isUser = Boolean(authUser);
  

  return (
    <div className='bg-black text-white min-h-screen'>
    <Routes>
     
      {/* User Routes (wrapped in UserLayout with sidebar) */}
      {isUser && (
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="course/:courseId" element={<Course />} />
        </Route>
      )}

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={!isUser ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={!isUser ? <Signup /> : <Navigate to="/dashboard" />} />

      {/* Admin Routes (no sidebar) */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={ <AdminLayout /> }
      >
        <Route path='/admin/course' element={<AdminCourse />} />
        <Route path="course/:courseId" element={<AdminDetailCourse />} />
        </Route>
       
      </Routes>
      </div>
  );
}

export default AppWrapper;
