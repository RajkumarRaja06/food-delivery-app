const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SHOW_CART':
      return { ...state, cartShow: action.cartShow };

    default:
      break;
  }
};

export default cartReducer;
