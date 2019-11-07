import * as actionTypes from './actionsTypes';

export const addIgredient = (ingName) =>{
    return{
        type : actionTypes.ADD_INGREDIENT,
        ingredientsName : ingName
    }
}

export const removeIngredient = (ingName) =>{
    return{
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientsName : ingName
    }
}