import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Root from './pages/Root';
import CartContainer from './pages/CartContainer';
import CreateItem from './pages/CreateItem';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route path='/createItem' element={<CreateItem />} />
          <Route path='/cartContainer' element={<CartContainer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
