import React from 'react';
import classes from './Logo.css';
import Img from '../../assets/images/burger-logo.png';

const Logo = (props) =>(
    <div className = {classes.Logo}>
        <img src = {Img} alt="My Burger" />
    </div>
)

export default Logo;