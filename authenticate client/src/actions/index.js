import axios from 'axios';
import { browserHistory } from 'react-router';

// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { routerMiddleware, push } from 'react-router-redux';
//
// // Apply the middleware to the store
// const middleware = routerMiddleware(browserHistory);
// const store = createStore(
//   applyMiddleware(middleware)
// );
//
// // Dispatch from anywhere like normal.

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';


export function signinUser({ email, password }) {
  return function(dispatch) {
  // Submit email/password to the server
  axios.post(`${ROOT_URL}/signin`, { email: email, password: password })
    .then(response => {
      // If request is good...
      // - Update state to indicaste user is authenticate
      dispatch({ type: AUTH_USER });
      // - Save the JWT token
      localStorage.setItem('token', response.data.token);
      // - redirect to the route '/feature'
      console.log("H");
      //debugger;
      browserHistory.push('/feature');
      console.log("H1");
    })
    .catch(() => {
      // If request id bad...
      // - Show an error to the user
      dispatch(authError('Bad Login Info'));
    });
  }
}

export function signupUser({ email, password }) {

  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER});
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
        //this.props.history.push('/feature');
      })
      .catch(error => {
        console.log("err", error.body);
        dispatch(authError('Bad Sign Up Info'))

      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

/* Redux-thunk */
export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.hi
        });
      });
  }
}

/* Redux-promise */
// export function fetchMessage() {
//   const request = axios.get(ROOT_URL, {
//     headers: { authorization: localStorage,getItem('token') }
//   });
//
//   return {
//     type: FETCH_MESSAGE,
//     payload: request
//   };
// }
