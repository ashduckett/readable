import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import promiseMiddleware from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, thunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>,
    
    
    document.getElementById('root'));
registerServiceWorker();

