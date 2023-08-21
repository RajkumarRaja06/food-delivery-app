import '../styles/menuSingleItem.css';
import { MdShoppingBasket } from 'react-icons/md';
import { FaRupeeSign } from 'react-icons/fa';
import { CartConsumer } from '../context/cartContext';

const MenuSingleItem = ({ item }) => {
  const { addToCart } = CartConsumer();
  const { id, title, imageUrl, calories, price } = item;
  return (
    <div className='menuSingleItem' key={id}>
      <div className='menuSingleItem-imgContainer'>
        <div className='menuSingleItem-img'>
          <img src={imageUrl} alt={title} />
        </div>
        <div
          className='menuSingleItem-addToCart'
          onClick={() => addToCart(item)}
        >
          <MdShoppingBasket />
        </div>
      </div>
      <div className='menuSingleItem-footer'>
        <p className='menuSingleItem-foodName'>{title}</p>
        <p className='menuSingleItem-calories'>{calories} Calories</p>
        <div className='menuSingleItem-price'>
          <span className='menuSingleItem-priceIcon'>
            <FaRupeeSign />
          </span>
          <span className='menuSingleItem-priceName'>{price}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuSingleItem;
