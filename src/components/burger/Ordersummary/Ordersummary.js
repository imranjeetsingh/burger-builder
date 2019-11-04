import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../../components/UI/Button/Button';

const OrderSummary = (props) =>{
    const ingredientsSummary = Object.keys(props.ingredients)
                                .map(igKey => {
                                    return (
                                        <li key = {igKey}>
                                            <span style={{ textTransform : 'capitalize' }}>
                                                {igKey} :  
                                            </span>
                                            {props.ingredients[igKey]}
                                        </li>
                                    )
                                })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients : </p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to checkout ?</p>
            <Button btnType = "Danger" clicked ={props.purchaseCanceled}>Cancel</Button>
            <Button btnType = "Success" clicked = {props.purchaseContinued}>Continue</Button>
        </Aux>
    )
}

export default OrderSummary;