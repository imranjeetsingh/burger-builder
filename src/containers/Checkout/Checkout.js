import React, {Component} from 'react';
import {Route} from 'react-router-dom';
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
        return(
            <div>
                <CheckoutSummary 
                onClickedContinued = {this.onClickedContinued}
                onClickedCancelled = {this.onClickedCancelled}
                ingredients = {this.props.ings}/>
                <Route path = {this.props.match.path+'/contact-data'} 
                    component = {ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings : state.ingredients,
        totalPrice : state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);