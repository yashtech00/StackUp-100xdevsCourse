import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex w-full min-h-screen bg-black text-white">
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
