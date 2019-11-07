import * as ActionType from '../Actions/actionsTypes';

const initialState = {
    ingredients : {
        salad:0,
        meat:0,
        cheese:0,
        bacon:0,
    },
    totalPrice : 4,
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
        
    }
    return state;
}

export default reducer;