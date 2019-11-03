import React, { Component } from 'react';
import Layout from './components/Layout/layout';
import BurgerBuulder from './containers/burgerbuulder/burgerbuilder';
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuulder />
        </Layout>
      </div>
    );
  }
}

export default App;
