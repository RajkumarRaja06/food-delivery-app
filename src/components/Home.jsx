import '../styles/home.css';
import delivery from '../../public/images/delivery.png';
import homeImg from '../../public/images/home.png';

const Home = () => {
  return (
    <div className='home'>
      <div className='homeContent'>
        <div className='homeContent-deliveryImg'>
          <p>Bike Delivery</p>
          <img src={delivery} alt='Delivery' />
        </div>
        <div className='homeContent-title'>Enjoy Our Delicious Meal</div>
        <div className='homeContent-desc'>
          Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
          diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
          lorem sit clita duo justo magna dolore erat amet
        </div>
        <div className='homeContent-btn'>
          <button type='button'>Order Now</button>
        </div>
      </div>
      <div className='homeImgContainer'>
        <img src={homeImg} alt='Home Image' />
      </div>
    </div>
  );
};

export default Home;
