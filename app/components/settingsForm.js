import React from 'react';
import IconButton from 'material-ui/IconButton';
import DoneIcon from 'material-ui/svg-icons/action/done';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import LanguageIcon from 'material-ui/svg-icons/action/language';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';

import Divider from 'material-ui/Divider';

import AppBar from "./appbar";

import { connect, dispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { updateConfiguration } from '../actions/configuration';
import { clearPages } from '../actions/pages';

import ResponsiveSelect from "./responsiveSelect";
import ResponsiveContainer from './responsiveContainer';

const required = value => (value ? undefined : 'This field is required.')

const SettingsForm = (props) => (
  <div>
    <AppBar
      title={"Settings"}
      onLeftIconButtonClick={props.history.goBack}
      iconElementLeft={<IconButton><BackIcon /></IconButton>}
      iconElementRight={<IconButton onClick={props.handleSubmit}><DoneIcon /></IconButton>}
    />
    <div style={{ padding: "0 1em", paddingTop: 64 }}>
      <ResponsiveContainer
        paperStyle={{
          padding: "2em",
          height: "calc(100vh - 64px - 2em)"
        }}
      >
        <ResponsiveSelect
          name="locale"
          validate={[required]}
          label={"Wikipedia Language"}
          collection={{
            'en': 'English',
            'ceb': 'Cebuano',
            'sv': 'Swedish',
            'de': 'German',
            'fr': 'French',
            'nl': 'Dutch',
            'ru': 'Russian',
            'it': 'Italian',
            'es': 'Spanish',
            'pl': 'Polish',
            'war': 'Waray',
            'vi': 'Vietnamese',
            'ja': 'Japanese',
            'pt': 'Portuguese',
            'zh': 'Chinese'
          }}
        />
      </ResponsiveContainer>
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    initialValues: state.configuration
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: (values) => {
      props.history.goBack();
      dispatch(updateConfiguration(values));
      dispatch(clearPages());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: "settings" })(SettingsForm));
