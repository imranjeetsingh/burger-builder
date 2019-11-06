import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore} from 'redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import Reducer from './store/reducers';

const store = createStore(Reducer);

const NewApp =(
    <Provider store = {store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    </Provider>
)

ReactDOM.render(NewApp, document.getElementById('root'));
registerServiceWorker();
