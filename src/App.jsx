import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartContainer, CreateItem, HeaderContainer, Home } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <HeaderContainer />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/createItem' element={<CreateItem />} />
        <Route path='/cartContainer' element={<CartContainer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
