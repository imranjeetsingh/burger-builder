import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, compose, applyMiddleware}from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import burgerBuilder from './store/Reducers/burgerBuilder';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(burgerBuilder,composeEnhancers(applyMiddleware(thunk)))
const NewApp =(
    <Provider store = {store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(NewApp, document.getElementById('root'));
registerServiceWorker();
