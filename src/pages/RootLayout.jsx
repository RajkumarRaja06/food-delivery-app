import { Navbar, Footer } from '../components';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
