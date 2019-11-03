import React from 'react';
import Aux from '../../hoc/Auxiliary';

const Layout = (props) => (
    <Aux>
        <div>Hello</div>
        <main> { props.children } </main>
    </Aux>
)

export default Layout;