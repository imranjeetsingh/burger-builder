import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/Sidedrawer';

class Layout extends Component {

    state = {
        showSideDrawer : true 
    }
    sideDrawerCloseHandler = () =>{
        this.setState({showSideDrawer : false})
    }
    render() {
        return (
            <Aux>
                <Toolbar />
                <SideDrawer open = {this.state.showSideDrawer} closed = {this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;