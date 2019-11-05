import React from 'react';

import classes from './CheckoutSummary.css';
import Burger from '../../burger/burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) =>{
    return(
        <div className ={classes.CheckoutSummary}>
            <h1>Tasty Burger is on way!!!!!</h1>
            <div style = {{width:'100%',margin:'auto'}}>
                <Burger ingredients = {props.ingredients}   />
            </div>
            <Button btnType="Danger" clicked>Cancel</Button>
            <Button btnType="Success" clicked>Checkout</Button>
        </div>
    )
}

export default CheckoutSummary;