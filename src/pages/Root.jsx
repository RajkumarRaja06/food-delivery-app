import HeaderContainer from './HeaderContainer';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <main>
      <HeaderContainer />
      <Outlet />
    </main>
  );
};

export default Root;
