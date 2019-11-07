import * as ActionTypes from './actionsTypes';
import Axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) =>{
    return {
        type : ActionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    }
}

export const purchaseBurgerFail = (error) =>{
    return {
        type : ActionTypes.PURCHASE_BURGER_FAIL,
        error : error
    }
}

export const purchaseBurgerStart = () =>{
    return{
        type: ActionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) =>{
    return dispatch => {
        dispatch(purchaseBurgerStart())
        Axios.post("/order.json",orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
            });
    }
}

export const purchaseInit = () =>{
    return {
        type : ActionTypes.PURCHASE_INIT
    }
}