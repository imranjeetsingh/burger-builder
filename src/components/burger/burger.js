import React from 'react';
import BurgerCss from './burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const Burger = (props) =>{
    let newIngredients = Object.keys(props.ingredients)
                           .map(igKey =>{
                               return [...Array(props.ingredients[igKey])].map((_,i) => {
                                  return <BurgerIngredients key={igKey+i} types={igKey}/>;
                               })
                           }).reduce((arr,el)=>{
                               return arr.concat(el)
                           },[])
    // console.log(newIngredients);
    if(newIngredients.length ===0){
        newIngredients = <p>Please start adding ingredients!!!!!</p>
    }
    return (
        <div className = {BurgerCss.Burger}>
            <BurgerIngredients types="bread-top"/>
            {newIngredients}
            <BurgerIngredients types="bread-bottom"/>
        </div>
    );
}

export default Burger;