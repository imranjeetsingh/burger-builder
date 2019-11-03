import React from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './layout.module.css';

const Layout = (props) => (
    <Aux>
        <div>Hello</div>
        <main className={classes.Content}>
             { props.children } 
        </main>
    </Aux>
)

export default Layout;