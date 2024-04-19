import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
  return (
    <div className='bg-gradient-to-r from-indigo-50 via-purple-100 to-pink-200 min-h-screen pt-20'>
      <Header />
      <Outlet />
    </div>
  );
};

export default Main;
