import * as ActionType from '../Actions/actionsTypes';

const initialState = {
    ingredients : null,
    totalPrice : 4,
    loading : false,
    error : false,
}

const INGREDIENTS_PRICES = {
    salad : 0.5,
    cheese : 1,
    meat : 10,
    bacon : 3,
}

const reducer = ( state = initialState, action) => {
    // console.log(state.ingredients)
    switch(action.type){
        case ActionType.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientsName] : state.ingredients[action.ingredientsName]+1
                },
                totalPrice : state.totalPrice +INGREDIENTS_PRICES[action.ingredientsName]
            }
        case ActionType.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientsName] : state.ingredients[action.ingredientsName]-1
                },
                totalPrice : state.totalPrice-INGREDIENTS_PRICES[action.ingredientsName]
            }
        case ActionType.SET_INGREDIENTS:
                return{
                    ...state,
                    ingredients :{
                        salad : action.ingredients.salad,
                        bacon : action.ingredients.bacon,
                        cheese : action.ingredients.cheese,
                        meat : action.ingredients.meat
                    },
                    error : false
                }
        case ActionType.FTECH_INGREDIENTS_FAILED:
                    return{
                        ...state,
                        error : true
                    }
        
    }
    return state;
}

export default reducer;