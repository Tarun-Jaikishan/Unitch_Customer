import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import { HashRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { history } from './utilits';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Routes from './Routes';
import AuthReducer from './redux/reducer/authRedux';
import PlanReducer from './redux/reducer/planReducer';
import AccountReducer from './redux/reducer/accountRedux';


const rootReducer = combineReducers({
  auth: AuthReducer,
  plan: PlanReducer,
  customer: AccountReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter history={history}>
      <Routes />
    </HashRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
