import * as ActionType from '../Actions/actionsTypes';

const initialOrder = {
    orders : [],
    loading : false,
    purchased : false,
}

const reducer = (state = initialOrder, action)=>{
    switch(action.type){
        case ActionType.PURCHASE_INIT:
            return{
                ...state,
                purchased : false
            }

        case ActionType.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id:action.orderId, 
            }
            return{
                ...state,
                loading:false,
                orders : state.orders.conncat(newOrder),
                purchased : true
            }
        case ActionType.PURCHASE_BURGER_FAIL:
            return{
                ...state,
                loading : false
            }
        case ActionType.PURCHASE_BURGER_START:
                    return{
                        ...state,
                        loading : true
                    }
        default:
            return state
    }
}

export default reducer;