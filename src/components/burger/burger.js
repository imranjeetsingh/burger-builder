import React from 'react';
import BurgerCss from './burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const Burger = (props) =>{
    return (
        <div className = {BurgerCss.Burger}>
            <BurgerIngredients types="bread-top"/>
            <BurgerIngredients types="cheese"/>
            <BurgerIngredients types="meat"/>
            <BurgerIngredients types="bread-bottom"/>
        </div>
    );
}

export default Burger;