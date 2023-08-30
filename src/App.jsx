import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  CreateItem,
  RootLayout,
  HomeContainer,
  Profile,
  LoginCredentials,
  SignUp,
  EditProfile,
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
          <Route path='loginCredentials' element={<LoginCredentials />} />
          <Route path='signUp' element={<SignUp />} />
          {userLoginData && <Route path='profile' element={<Profile />} />}
          <Route path='editProfile' element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
