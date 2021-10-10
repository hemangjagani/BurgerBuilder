import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Container/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import burgerReducer from './Store/reducer/burgerbuilderReducer';
import orderReducer from './Store/reducer/orderReducer'
import authReducer from './Store/reducer/authReducer'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { watchAuth, watchBurgerBuilder, watchOrderBuilder } from './Store/Sagas/index'


const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const rootreducer = combineReducers({
  burgerBuilder: burgerReducer,
  order: orderReducer,
  auth: authReducer
})
const store = createStore(rootreducer, composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware)
));
sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder)
sagaMiddleware.run(watchOrderBuilder)
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
