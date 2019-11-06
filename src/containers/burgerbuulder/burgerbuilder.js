import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/buildscontrols/buildscontrols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/burger/Ordersummary/Ordersummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import Axios from '../../axios-order';
import ErrorHandler from '../../hoc/WithError/withError';
import * as ActionType from '../../store/actions';


class BurgerBuilder extends Component{
    state = {
        totalPrice : 5,
        purchasable : false,
        purchasing : false,
        loading : false,
        error : false
    }

    purchasehandler = () =>{
        this.setState({purchasing : true});
    }

    purchaseCancelhandler = () =>{
        this.setState({purchasing : false})
    }

    purchaseContinuehandler = () =>{

        this.props.history.push("/checkout");
    }

    updatePurchaseable () {
        const sum = Object.keys(this.props.ings)
                    .map(igKey =>{
                        return this.props.ings[igKey]
                    })
                    .reduce((sum,el) =>{
                        return sum+el
                    },0)
        return sum > 0;
        // this.setState({purchasable : sum>0});
        // console.log(this.state.purchasable,sum)
    }

    render(){
        // console.log(this.props.ings)
        const disableInfo = {
            ...this.props.ings
        }
        for (let key in disableInfo){
            disableInfo[key]=disableInfo[key]<=0;
        }
        let orderSummary =null;
        
        let burger = this.state.error ? <p>Ingredients can't be loaded from database.</p> : <Spinner/>
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        ingredientsAdded={this.props.onIngredientAdded}
                        ingredientsRemove={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        totalPrice={this.props.totalPrice}
                        ordered={this.purchasehandler}
                        purchaseable={this.updatePurchaseable()} /></Aux>)
            orderSummary = <OrderSummary ingredients={this.props.ings}
                purchaseCanceled={this.purchaseCancelhandler}
                purchaseContinued={this.purchaseContinuehandler}
                totalPrice={this.props.totalPrice} />
            if (this.state.loading) {
                orderSummary = <Spinner />
            }
        }
       
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelhandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings : state.ingredients,
        totalPrice : state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch({type:ActionType.ADD_INGREDIENT,ingredientsName:ingName}),
        onIngredientRemoved : (ingName) => dispatch({type:ActionType.REMOVE_INGREDIENT,ingredientsName:ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ErrorHandler(BurgerBuilder,Axios));