const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SHOW_CART':
      return { ...state, cartShow: action.cartShow };

    case 'CLEAR_CART':
      return { ...state, cartItems: [] };

    case 'CHECKOUT':
      return { ...state, cartItems: [], cartShow: false };

    case 'ADD_TO_CART':
      const existedItem = state.cartItems.find(
        (cartItem) => cartItem.id === action.item.id
      );
      if (existedItem) {
        const updateCart = state.cartItems.map((cartItem) => {
          return cartItem.id === existedItem.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem;
        });
        return { ...state, cartItems: updateCart };
      } else {
        const updateCart = [
          ...state.cartItems,
          { ...action.item, quantity: 1 },
        ];
        return { ...state, cartItems: updateCart };
      }

    case 'UPDATE_PRICE':
      const updatePrice = state.cartItems.reduce((pre, curr) => {
        const amount = curr.quantity * curr.price;
        return pre + amount;
      }, 0);
      return { ...state, subTotal: updatePrice };

    case 'REMOVE_TO_CART':
      const updateCart = state.cartItems
        .map((cartItem) =>
          cartItem.id === action.item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0);
      return { ...state, cartItems: updateCart };

    default:
      return { state };
  }
};

export default cartReducer;
