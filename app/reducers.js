import configuration from "./reducers/configuration";
import pages from "./reducers/pages";
import error from "./reducers/error";

import { routerReducer } from 'react-router-redux';

import { combineReducers } from "redux";
import { reducer as formReducer, actionTypes as formActionTypes } from 'redux-form';

export default combineReducers({
  configuration,
  pages,
  error,
  form: formReducer,
  router: routerReducer
})
