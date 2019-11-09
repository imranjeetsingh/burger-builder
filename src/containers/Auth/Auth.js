import React, {Component} from 'react';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Forms/Input';
import classes from './Auth.css';

class Auth extends Component{
    state = {
        controls :{
            email: {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your Email'
                },
                value : '',
                validation :{
                    required : true,
                    emailValid : true
                },
                valid : false,
                touched : false
            },
            password: {
                elementType : 'input',
                elementConfig : {
                    type : 'password',
                    placeholder : 'password'
                },
                value : '',
                validation :{
                    required : true,
                    minlength : 6

                },
                valid : false,
                touched : false
                }
           
        }
    }
    checkValidity(value, rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !=='' && isValid;
        }
        if(rules.minlength){
            isValid = value.length >= rules.minlength && isValid;
        }
        if(rules.maxlength){
            isValid = value.length == rules.maxlength && isValid;
        }
        if(rules.emailValid){
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            isValid = isValid && value.match(mailformat);
        }
        return isValid;
    }
    onChangeHandler =(event,id)=>{
       const updatedControl = {
           ...this.state.controls,
           [id]:{
               ...this.state.controls[id],
               value : event.target.value,
               valid : this.checkValidity(event.target.value,this.state.controls[id].validation),
               touched : true,
           }
       }
       this.setState({controls:updatedControl})
    }
    render(){
        const formArray = []
        for (let key in this.state.controls){
            formArray.push({
                id:key,
                config : this.state.controls[key]
            })
        }
        const form = formArray.map(formElement => (
            <Input
                key ={formElement.id}
                elementType = {formElement.config.elementType}
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.config.value}
                invalid = {!formElement.config.valid}
                shouldValidate = {formElement.config.validation}
                touched = {formElement.config.touched}
                changed ={(event) => this.onChangeHandler(event, formElement.id)}
            />
        ))
        return(
            <div>
                <form className={classes.Auth}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
            </div>
        )
    }
}   

export default Auth;