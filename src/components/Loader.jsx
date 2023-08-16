import ReactLoading from 'react-loading';
import React from 'react';

import '../styles/createItem.css';

const Loader = () => {
  return (
    <ReactLoading
      type='spin'
      color='#000'
      height={40}
      width={40}
      className='loader'
    />
  );
};

export default Loader;
