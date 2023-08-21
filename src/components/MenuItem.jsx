import '../styles/menuItem.css';
import { footerImages } from '../constants';

const MenuItem = () => {
  return (
    <section className='menuItem' id='about'>
      <div className='menuItemTitle'>Top Rated Menu Items</div>
      <div className='menuItemContainer'>
        {footerImages.map((item) => {
          const { id, name, image } = item;
          return (
            <div className='single_menuItem' key={id}>
              <p>{name}</p>
              <img src={image} alt={name} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MenuItem;
