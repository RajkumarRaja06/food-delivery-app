import { Navbar, Footer } from '../components';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default RootLayout;
