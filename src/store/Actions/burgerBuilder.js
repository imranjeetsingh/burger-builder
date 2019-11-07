import * as actionTypes from './actionsTypes';
import Axios from '../../axios-order';

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

export const setIngredients  = (ingredients) =>{
    return {
        type : actionTypes.SET_INGREDIENTS,
        ingredients : ingredients
    }
}

export const fetchIngredientsFailed = () =>{
    return {
        type : actionTypes.FTECH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () =>{
    return dispatch =>{
        Axios.get("https://react-burger-app-ab541.firebaseio.com/ingredients.json")
            .then(response =>{
                dispatch(setIngredients(response.data));
            }).catch(error =>{
                dispatch(fetchIngredientsFailed())
            })
    }
}