import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers}from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import burgerBuilderReducer from './store/Reducers/burgerBuilder';
import orderReducer from './store/Reducers/orders';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    order : orderReducer,
    burgerBuilder : burgerBuilderReducer
})

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))
const NewApp =(
    <Provider store = {store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(NewApp, document.getElementById('root'));
registerServiceWorker();
