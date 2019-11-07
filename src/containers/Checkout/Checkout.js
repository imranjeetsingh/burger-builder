import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import ContactData from '../Checkout/ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{

    onClickedCancelled = () =>{
        this.props.history.goBack();
    }

    onClickedContinued = () =>{
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        let summary = <Redirect to="/" />
        if(this.props.ings){
            console.log(this.props.purchased)
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary 
                    onClickedContinued = {this.onClickedContinued}
                    onClickedCancelled = {this.onClickedCancelled}
                    ingredients = {this.props.ings}/>

                    <Route path = {this.props.match.path+'/contact-data'} 
                        component = {ContactData}/>
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        purchased : state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);