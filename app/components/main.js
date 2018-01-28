import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router'
import Snackbar from 'material-ui/Snackbar';

import SettingsForm from './settingsForm';
import PageLoader from './pageLoader';

const Main = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={PageLoader} />
        <Route exact path="/settings" component={SettingsForm} />
        <Route exact path="/:pageId" component={PageLoader} />
      </Switch>
      { !!props.error && <Snackbar open={true} message={props.error} autoHideDuration={2000} /> }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    variations: state.variations,
    onboarding: state.configuration.onboarding,
    error: state.error
  }
}

export default withRouter(connect(mapStateToProps, undefined)(Main));
