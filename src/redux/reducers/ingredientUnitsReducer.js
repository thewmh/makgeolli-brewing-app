const ingredientUnits = (state = [], action) => {
    switch (action.type) {
      case 'SET_RECIPE_INGREDIENT_UNITS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default ingredientUnits;
  