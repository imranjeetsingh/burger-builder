import React from 'react';

import classes from './Input.css';

const Input = (props) =>{
    let validationMessage = null;
    let inputElement = null;
    const inpuClasses = [classes.InputElement]
    if(props.invalid && props.shouldValidate && props.touched){
        inpuClasses.push(classes.Invalid)
    }
    if(props.invalid && props.touched){
        validationMessage = <p className={classes.ValidationError}>Please enter a valid value!!!</p>
    }
    console.log(props.elementType)
    switch(props.elementType){
        case('input') :
            inputElement = <input className={inpuClasses.join(' ')} 
                            {...props.elementConfig} value ={props.value}
                            onChange = {props.changed}/>
            break;
        case('textarea') :
            inputElement = <textarea className={inpuClasses.join(' ')} 
                            {...props.elementConfig} value = {props.value} 
                            onChange = {props.changed}
                            />
            break;
        case('select') :
            inputElement = <select 
                            className = {inpuClasses.join(' ')}
                            value ={props.value} onChange = {props.changed}>
                            {props.elementConfig.options.map(option=>(
                                <option key={option} value ={option.value}>
                                    {option.displayValue}
                                </option>
                            ))}
                            </select>
            break;
        default :
            inputElement = <input className={inpuClasses.join(' ')} 
                            {...props.elementConfig} value = {props.value}/>
    }

    return(
        <div className={classes.Input}>
            <label>{props.label}</label>
            {inputElement}
            {validationMessage}
        </div>
    )
}

export default Input