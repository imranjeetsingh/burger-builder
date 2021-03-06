import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from './hoc/Layout/layout';
import BurgerBuilder from './containers/burgerbuulder/burgerbuilder';
import Checkout from "./containers/Checkout/Checkout";

import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {
  
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/orders" component={Orders} />
            <Route path="/checkout" component = {Checkout} />
            <Route path="/auth" component = {Auth} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
