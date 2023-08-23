import '../styles/index.css';
import {
  Home,
  RowContainer,
  MenuContainer,
  Cart,
  MenuItem,
  ServiceForm,
} from '../components';
import { CartConsumer } from '../context/cartContext';

const HomeContainer = () => {
  const { cartShow } = CartConsumer();
  return (
    <>
      <Home />
      <RowContainer />
      <MenuContainer />
      {cartShow && <Cart />}

      <MenuItem />
      <ServiceForm />
    </>
  );
};

export default HomeContainer;
