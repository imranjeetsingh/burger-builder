import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Classes from './ContactData.css';

class ContactData extends Component{
    state = {
        name : '',
        email : '',
        address : {
            street : '',
            postalCode:'',
        }
    }
    render(){
        return(
            <div  className = {Classes.ContactData}>
                <h3>Enter your contact details</h3>
                <form >
                    <input className = {Classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className = {Classes.Input} type="text" name="email" placeholder="Your Email" />
                    <input className = {Classes.Input} type="text" name="street" placeholder="street" />
                    <input className = {Classes.Input} type="text" name="postalcode" placeholder="Your Postalcode" />
                    <Button btnType ="Success">Submit</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;