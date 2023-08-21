import '../styles/menuContainer.css';
import { MdFastfood } from 'react-icons/md';
import { categories } from '../constants';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MenuSingleItem from './MenuSingleItem';
import { CreateItemConsumer } from '../context/createItemContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MenuContainer = () => {
  const { foodData } = CreateItemConsumer();
  const [data, setData] = useState(foodData);

  const [filter, setFilter] = useState('chicken');

  useEffect(() => {
    setData(foodData && foodData.filter((item) => item.category === filter));
  }, [foodData]);

  useEffect(() => {
    setData(foodData && foodData.filter((item) => item.category === filter));
  }, [filter]);

  return (
    <section className='menuContainer' id='menu'>
      <div className='menuContainer-title'>
        <p>Our Hot Dishes</p>
      </div>
      <div className='menuContainer-btnContainer'>
        {categories.map((item) => {
          return (
            <motion.div
              whileTap={{ scale: 0.6 }}
              className={
                filter === item.urlParamName
                  ? 'menuContainer-btn-active'
                  : 'menuContainer-btn'
              }
              key={item.id}
              onClick={() => setFilter(item.urlParamName)}
            >
              <div
                className={
                  filter === item.urlParamName
                    ? 'menuContainer-btnIcon-active'
                    : 'menuContainer-btnIcon'
                }
              >
                <MdFastfood />
              </div>
              <p>{item.name}</p>
            </motion.div>
          );
        })}
      </div>
      <div className='menuSingleItem-container'>
        {data &&
          data.map((item, index) => <MenuSingleItem item={item} key={index} />)}
      </div>
      <ToastContainer />
    </section>
  );
};

export default MenuContainer;
