import React from 'react';
import classes from './buildcontrol.css';

const BuildControl = (props) =>(
    <div className={classes.BuildControl}>
        <div className = {classes.Label}>{props.label}</div>
        <p>{props.totalPrice}</p>
        <button className = {classes.Less} 
                onClick = {props.removed}
                disabled = {props.disabled}>Less</button>
        <button className = {classes.More} onClick = {props.added}>More</button>
    </div>
);

export default BuildControl;