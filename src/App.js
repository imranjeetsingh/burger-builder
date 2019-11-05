import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from './hoc/Layout/layout';
import BurgerBuilder from './containers/burgerbuulder/burgerbuilder';
import Checkout from "./containers/Checkout/Checkout";

class App extends Component {
  
  render() {
    return (
      <div>
        <Layout>
          {/* <Switch> */}
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component = {Checkout} />
          {/* </Switch> */}
        </Layout>
      </div>
    );
  }
}

export default App;
