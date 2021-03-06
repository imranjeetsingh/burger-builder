import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Classes from './ContactData.css';
import Axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import InputElement from '../../../components/UI/Forms/Input';
import WithErrorHandler from '../../../hoc/WithError/withError';
import * as actions from '../../../store/Actions/index';


class ContactData extends Component{
    state = {
        OrderForm: {
            name: {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your Name'
                },
                value : '',
                validation :{
                    required : true
                },
                valid : false,
                touched : false
            },
            street: {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'street'
                },
                value : '',
                validation :{
                    required : true
                },
                valid : false,
                touched : false
                },
            zipcode: {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Zipcode'
                },
                value : '',
                validation :{
                    required : true,
                    minlength : 6,
                    maxlength : 6
                },
                valid : false,
                touched : false
            },
            country:{
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Country'
                },
                value : '',
                validation :{
                    required : true
                },
                valid : false,
                touched : false
            },
            email: {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your Email'
                },
                value : '',
                validation :{
                    required : true
                },
                valid : false,
                touched : false
            },
            deliveryMethod:{
                elementType : 'select',
                elementConfig : {
                    options : [
                        {value : 'fastest', displayValue:'Fastest'},
                        {value : 'normal', displayValue:'Normal'}
                    ]
                },
                value : '',
                validation :{
                    required : true
                },
                valid : false,
                touched : false,
            },
        },
        // loading : false,
        isFormValid : false,
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
        return isValid;
    }

    orderHandler = (event) =>{
        event.preventDefault();
        // console.log(this.props.price)
        // this.setState({loading:true})
        const formdata = {}
        for(let data in this.state.OrderForm){
            formdata[data] = this.state.OrderForm[data].value;
        }
        const order = {
            customer : formdata,
            ingredients: this.props.ings,
            price: this.props.totalPrice,
        }
        this.props.onOrderBurger(order);
        this.props.history.push('/')
    }

    onChangeHandler(event,id){
        let updatedOrder = {...this.state.OrderForm}
        let updatedOrderElement = {...updatedOrder[id]}
        updatedOrderElement.value = event.target.value;
        updatedOrderElement.valid = this.checkValidity(updatedOrderElement.value,updatedOrderElement.validation);
        updatedOrderElement.touched = true;
        updatedOrder[id] = updatedOrderElement;
        let formValid = true;
        for(let validData in updatedOrder){
            // console.log(updatedOrder[validData].valid)
            formValid = updatedOrder[validData].valid && formValid;
        }
        console.log(formValid)
        this.setState({OrderForm:updatedOrder, isFormValid:formValid});
    }

    componentDidUpdate() {
        if (this.props.purchased) {
         this.props.history.replace("/");
        }
       }

    render(){
        const formArray = []
        for (let key in this.state.OrderForm){
            formArray.push({
                id:key,
                config : this.state.OrderForm[key]
            })
        }
        // console.log(formArray)
        let form =(
            <form >
                { formArray.map(formElement => (
                    <InputElement
                        key ={formElement.id} 
                        elementType = {formElement.config.elementType}
                        elementConfig = {formElement.config.elementConfig}
                        value = {formElement.config.value}
                        invalid = {!formElement.config.valid}
                        shouldValidate = {formElement.config.validation}
                        touched = {formElement.config.touched}
                        changed ={(event)=>this.onChangeHandler(event, formElement.id)}    
                    />
                ))}
                <Button btnType ="Success" disabled = {!this.state.isFormValid} clicked = {this.orderHandler}>Submit</Button>
            </form>
        )
        if(this.props.loading){
            form  = <Spinner />
        }
        return(
            <div  className = {Classes.ContactData}>
                <h3>Enter your contact details</h3>
                    {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        loading : state.order.loading
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger : (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(ContactData,Axios));