import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/buildscontrols/buildscontrols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/burger/Ordersummary/Ordersummary';
// import BuildControl from '../../components/burger/buildscontrols/buildcontrol/buildcontrol';


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

    purchasehandler(){
        this.setState({purchasing : true});
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
                <Modal>
                    <OrderSummary ingredients = {this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientsAdded = {this.addIngredientsHandler} 
                               ingredientsRemove ={this.removeIngredientsHandler}
                               disabled={disableInfo}
                               totalPrice = {this.state.totalPrice}
                               purchaseable = {this.state.purchasable}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;