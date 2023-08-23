import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  CartContainer,
  CreateItem,
  RootLayout,
  HomeContainer,
  Profile,
  LoginCredentials,
} from './pages';

import { UserConsumer } from './context/userContext';

const App = () => {
  const { userLoginData } = UserConsumer();
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<HomeContainer />} />
          <Route path='createItem' element={<CreateItem />} />
          <Route path='cartContainer' element={<CartContainer />} />
          <Route path='loginCredentials' element={<LoginCredentials />} />
          {userLoginData && <Route path='profile' element={<Profile />} />}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
