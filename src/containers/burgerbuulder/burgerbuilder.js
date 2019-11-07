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
import * as BurgerBuilderActions from '../../store/Actions/index';


class BurgerBuilder extends Component{
    state = {
        purchasable : false,
        purchasing : false,

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

    componentDidMount(){
        this.props.initIngrdients();
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
        
        console.log(this.props.error)

        let burger = this.props.error ? <p>Ingredients can't be loaded from database.</p> : <Spinner/>
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
        totalPrice : state.totalPrice,
        error : state.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch(BurgerBuilderActions.addIgredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(BurgerBuilderActions.removeIngredient(ingName)),
        initIngrdients : () => dispatch(BurgerBuilderActions.initIngredients()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ErrorHandler(BurgerBuilder,Axios));