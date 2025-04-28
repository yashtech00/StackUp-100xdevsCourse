import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';  
   
import AdminCourse from './pages/Admin/AdminCourse';  
import AdminDetailCourse from './pages/Admin/AdminDetailCourse';  

import { useAdminAuth } from '../../client-admin/src/hooks/AdminIndex';
import AdminLogin from './pages/Admin/AdminAuth';
import { AdminNavbar } from './components/admin/Navbar';


function AdminLayout({ children }: { children: React.ReactNode }) {  
  return (  
    <><AdminNavbar/> 
    <div className="min-h-screen p-4"> 
     
      {children}  
      </div> 
      </>  
  );  
}  

function App() {  
  

  const { authAdmin,isLoading } = useAdminAuth();
 

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
          {/* Admin Routes wrapped in AdminLayout */}  
          <Route path="/" element={!authAdmin ? <AdminLogin /> :  <AdminLayout><AdminCourse /></AdminLayout> } />  
          <Route path="/admin" element={authAdmin ? <AdminLayout><AdminCourse /></AdminLayout> :<Navigate to="/"/> } />
          <Route path="/admin/course/:courseId" element={authAdmin ? <AdminLayout><AdminDetailCourse /></AdminLayout> : <Navigate to="/dashboard"/>}/>  

         
        </Routes>  
      </div>  
    </BrowserRouter>  
  );  
}  

export default App;  