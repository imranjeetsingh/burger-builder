import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Classes from './ContactData.css';
import Axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component{
    state = {
        name : '',
        email : '',
        address : {
            street : '',
            postalCode:'',
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
            customer: {
                name: "Ranjeet Singh",
                address: {
                    street: "poisar",
                    zipcode: '400101',
                    country: 'India'
                },
                email: "ranjee970@gmail.com",
            },
            deliveryMethod: 'fastest',
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
        let form =(
            <form >
                <input className = {Classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className = {Classes.Input} type="text" name="email" placeholder="Your Email" />
                <input className = {Classes.Input} type="text" name="street" placeholder="street" />
                <input className = {Classes.Input} type="text" name="postalcode" placeholder="Your Postalcode" />
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