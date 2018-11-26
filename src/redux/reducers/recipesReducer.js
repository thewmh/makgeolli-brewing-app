const addRecipeReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_RECIPE_TITLE':
            return {...state, title: action.payload.title}
        case 'ADD_RECIPE_DESCRIPTION':
            return {...state, description: action.payload.description}
        case 'ADD_RECIPE_INGREDIENTS':
            return {...state, ingredients: action.payload.ingredients}
        case 'ADD_RECIPE_INSTRUCTIONS':
            return {...state, instructions: action.payload.instructions}
        case 'ADD_NEW_RECIPE':
            state = action.payload
            break;
        case 'SET_RECIPES':
            return action.payload;
        case 'SET_RECIPE_VIEW':
            return action.payload;
        case 'ADD_RECIPE_TO_USER_LIBRARY':
            return action.payload
      default:
        return state;
    }
    console.log('state is now:', state);
    return state;
  };
  
  export default addRecipeReducer;