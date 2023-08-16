import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartContainer, CreateItem, RootLayout, HomeContainer } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<HomeContainer />} />
          <Route path='createItem' element={<CreateItem />} />
          <Route path='cartContainer' element={<CartContainer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
