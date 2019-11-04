import React from 'react';
import classes from './buildcontrols.css';
import BuildControl from './buildcontrol/buildcontrol';

const controls  = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]
const BuildControls = (props) => (
    <div className = {classes.BuildControls}>
        <p>Current Price : <strong>{props.totalPrice}</strong></p>
        {controls.map(ctrl =>(
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added={()=>props.ingredientsAdded(ctrl.type)}
                removed = {()=>props.ingredientsRemove(ctrl.type)} 
                disabled ={props.disabled[ctrl.type]}/>
        ))}
        <button className = {classes.OrderButton} disabled = {!props.purchaseable}>Order Now</button>
    </div>
);

export default BuildControls;