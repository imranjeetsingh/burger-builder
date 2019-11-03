import React from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './layout.css';

const Layout = (props) => (
    <Aux>
        <main className={classes.Content}>
             { props.children } 
        </main>
    </Aux>
)

export default Layout;