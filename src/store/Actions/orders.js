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

export const fetchOrderSuccess=(orders)=>{
    return{
        type : ActionTypes.FETCH_ORDER_SUCCESS,
        orders : orders
    }
}

export const fetchOrderFail=(error)=>{
    return{
        type : ActionTypes.FETCH_ORDER_FAIL,
        error : error
    }
}

export const fetchOrderStart=()=>{
    return{
        type : ActionTypes.FETCH_ORDER_START,
    }
}

export const fetchOrder = () =>{
    return dispatch =>{
        dispatch(fetchOrderStart())
        Axios.get("/order.json")
        .then(res => {
            const fetchedOrder = []
            for(let key in res.data){
                    fetchedOrder.push({
                        ...res.data[key],
                        id:key
                    })
            }
            dispatch(fetchOrderSuccess(fetchOrder))
            console.log(res)
        })
        .catch(err =>{
            dispatch(fetchOrderFail(err))
        })
    }
}

