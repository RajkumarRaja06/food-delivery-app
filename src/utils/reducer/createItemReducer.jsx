const createItemReducer = (state, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return { ...state, foodData: action.foodData };

    default:
      return { state };
  }
};

export default createItemReducer;
