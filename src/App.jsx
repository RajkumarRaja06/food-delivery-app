import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  CartContainer,
  CreateItem,
  RootLayout,
  HomeContainer,
  Profile,
} from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<HomeContainer />} />
          <Route path='createItem' element={<CreateItem />} />
          <Route path='cartContainer' element={<CartContainer />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
