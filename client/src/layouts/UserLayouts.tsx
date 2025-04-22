import { Outlet } from 'react-router-dom';
import { SideBar } from '../Components/SideBar';

const UserLayout = () => {
  return (
    <div className="flex w-full min-h-screen bg-black text-white">
      <SideBar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
