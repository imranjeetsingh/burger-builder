import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/buildscontrols/buildscontrols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/burger/Ordersummary/Ordersummary';
import Axios from '../../axios-order';

const INGREDIENTS_PRICES = {
    salad : 0.5,
    cheese : 1,
    meat : 10,
    bacon : 3,
}

class BurgerBuilder extends Component{
    state = {
        ingredients:{
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat : 0,
        },
        totalPrice : 5,
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
        // alert("Have your Burger!!!")
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
        Axios.post("/orders.json",order)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }

    updatePurchaseable (ingredients) {
        const sum = Object.keys(ingredients)
                    .map(igKey =>{
                        return ingredients[igKey]
                    }).reduce((sum,el) =>{
                        return sum+el
                    },0)
        this.setState({purchasable : sum>0});
        // console.log(this.state.purchasable,sum)
    }

    addIngredientsHandler = (type) => {
        const updatedCount = this.state.ingredients[type]+1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const new_price = this.state.totalPrice+INGREDIENTS_PRICES[type];
        this.setState(
            {
                totalPrice: new_price, ingredients : updatedIngredients
            }
        )
        this.updatePurchaseable(updatedIngredients);    
    }

    removeIngredientsHandler = (type) => {
        const updatedCount = this.state.ingredients[type]-1;
        const updatedIngredients = {
                ...this.state.ingredients
            }
        updatedIngredients[type] = updatedCount;
        const new_price = this.state.totalPrice-INGREDIENTS_PRICES[type];
        this.setState(
            {
                totalPrice: new_price, ingredients : updatedIngredients
            }
        )
        this.updatePurchaseable(updatedIngredients);
    }

    render(){
        const disableInfo = {
            ...this.state.ingredients
        }
        for (let key in disableInfo){
            disableInfo[key]=disableInfo[key]<=0;
        }
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelhandler}>
                    <OrderSummary ingredients = {this.state.ingredients}
                                    purchaseCanceled ={this.purchaseCancelhandler}
                                    purchaseContinued ={this.purchaseContinuehandler}
                                    totalPrice = {this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientsAdded = {this.addIngredientsHandler} 
                               ingredientsRemove ={this.removeIngredientsHandler}
                               disabled={disableInfo}
                               totalPrice = {this.state.totalPrice}
                               ordered = {this.purchasehandler}
                               purchaseable = {this.state.purchasable}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;