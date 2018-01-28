import React from 'react';
import MaterialAppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import { red900, green900, grey300 } from 'material-ui/styles/colors';

import { connect } from 'react-redux';

import LoadNextButton from './loadNextButton';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import { Link } from 'react-router-dom';

import AppBar from "./appbar";
import ResponsiveContainer from './responsiveContainer';


import wtf from "wtf_wikipedia/builds/wtf_wikipedia";

const SettingsButton = (props) => (
  <IconButton containerElement={<Link to="/settings" />}>
    <SettingsIcon color="white" />
  </IconButton>
)

const PageSection = (props) => {
  if (props.section.sentences && props.section.sentences.length > 0) {
    return (
      <div
        style={{
        }}
      >
        {
          props.section.title && props.section.title.length > 0 &&
            <h2
              style={{
                fontSize: "1.2em",
                fontWeight: "bold"
              }}
            >
              {props.section.title}
            </h2>
        }
        {
          <div>
            {
              props.section.sentences.map((sentence, index) => (
                <span key={index}>
                  {sentence.text}
                  <PageSection section={sentence} />
                  {" "}
                </span>
              ))
            }
          </div>
        }
      </div>
    )
  }
  return (null);
}

const Page = (props) => (
  <div>
    <AppBar
      title={props.page.title}
      showMenuIconButton={false}
      iconElementRight={
        <SettingsButton {...props} />
      }
    />
    <div
      style={{
        paddingTop: 64,
        paddingBottom: 96,
        zIndex: 0
      }}
    >
      <ResponsiveContainer
        paperStyle={{
          height: "calc(100vh - 184px)"
        }}
      >
        <div
          style={{
            padding: "1em",
            fontSize: "1.1em",
            fontFamily: "Roboto, sans-serif",
            lineHeight: "1.2em",
            overflow: "hidden"
          }}
          className="page-content"
        >
          {
            props.page.sections && props.page.sections.map((section, index) => (
              <PageSection key={index} section={section} />
            ))
          }
        </div>
      </ResponsiveContainer>
      <LoadNextButton onClick={() => props.onNextPage()} />
    </div>
  </div>
);

function mapStateToProps(state, props) {
  return {
    configuration: state.configuration
  };
}

export default connect(mapStateToProps)(Page);
