import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Classes from './ContactData.css';
import Axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import InputElement from '../../../components/UI/Forms/Input';


class ContactData extends Component{
    state = {
        OrderForm: {
            name: {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your Name'
                },
                value : ''
            },
            street: {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'street'
                },
                value : ''
                },
            zipcode: {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Zipcode'
                },
                value : ''
            },
            country:{
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Country'
                },
                value : ''
            },
            email: {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your Email'
                },
                value : ''
            },
            deliveryMethod:{
                elementType : 'select',
                elementConfig : {
                    options : [
                        {value : 'fastest', displayValue:'Fastest'},
                        {value : 'normal', displayValue:'Normal'}
                    ]
                },
                value : ''
            },
        },
        loading : false
    }

    orderHandler = (event) =>{
        event.preventDefault();
        console.log(this.props.price)
        this.setState({loading:true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        }
        Axios.post("/order.json",order)
        .then(response => {
            this.setState({loading:false})
            this.props.history.push('/')
        })
        .catch(error => {
            this.setState({loading:true})
        });
    }

    render(){
        const formArray = []
        for (let key in this.state.OrderForm){
            formArray.push({
                id:key,
                config : this.state.OrderForm[key]
            })
        }
        console.log(formArray)
        let form =(
            <form >
                { formArray.map(formElement => (
                    <InputElement
                        key ={formElement.id} 
                        elementType = {formElement.config.elementType}
                        elementConfig = {formElement.config.elementConfig}
                        value = {formElement.config.value}    
                    />
                ))}
                <Button btnType ="Success" clicked = {this.orderHandler}>Submit</Button>
            </form>
        )
        if(this.state.loading){
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

export default ContactData;