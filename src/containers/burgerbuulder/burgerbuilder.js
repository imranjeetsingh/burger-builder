import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/buildscontrols/buildscontrols';
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
        totalPrice : 5
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
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientsAdded = {this.addIngredientsHandler} 
                               ingredientsRemove ={this.removeIngredientsHandler}
                               disabled={disableInfo}
                               totalPrice = {this.state.totalPrice}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;