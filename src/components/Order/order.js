import React from 'react';

import classes from './Order.css'

const Order = (props) =>{
    const ingredients = []
    for(let ingredientsname in props.ingredients){
        ingredients.push({
            name: ingredientsname,
            amount : props.ingredients[ingredientsname]
        })
    }
    const ingredientsOutput = ingredients.map(ig =>{
        return <span key = {ig.name}
                style={{
                    textTransform:'capitalize',
                    display:'inline-block',
                    margin:'0 8px',
                    border:'1px solid #ccc',
                    padding:'5px'
                }}
                >
                {ig.name}  ({ig.amount})</span>
    })
    return(
        <div className = {classes.Order}>
            Ingredients : {ingredientsOutput}
            <p>Prices : {props.price}</p>
        </div>
    )
   
}

export default Order;