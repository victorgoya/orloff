import React from 'react';

import { connect } from 'react-redux';

import AppBar from "./appbar";
import ResponsiveContainer from './responsiveContainer';
import { push } from 'react-router-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Page from './page';
import { loadNextPages } from '../actions/pages';
import { replace } from 'react-router-redux';

class PageLoader extends React.Component {
  componentWillMount() {
    if (Object.keys(this.props.pages).length === 0 || !this.props.page) {
      this.props.loadNextPages();
    }
  }

  componentWillReceiveProps(newProps) {
    if (Object.keys(newProps.pages).length === 0 || (this.props.page && !newProps.page)) {
      newProps.loadNextPages();
    }
    window.scrollTo(0, 0);
  }

  render() {
    if (!!this.props.page) {
      return (<Page page={this.props.page} nextPage={this.props.nextPage} onNextPage={this.props.replaceWithNextPage} />)
    }

    return (
      <div
        style={{
          paddingTop: "calc(50vh - 30px)",
          textAlign: "center"
        }}
      >
        <CircularProgress />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const pageKeys = Object.keys(state.pages);

  return {
    page: state.pages[props.match.params.pageId],
    pages: state.pages,
    nextPage: pageKeys[pageKeys.indexOf(props.match.params.pageId) + 1],
    configuration: state.configuration
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadNextPages: (language) => dispatch(loadNextPages(language)),
    replaceWithNextPage: (pageId) => dispatch(replace(pageId ? `/${pageId}` : '/'))
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    loadNextPages: () => dispatchProps.loadNextPages(stateProps.configuration.locale),
    replaceWithNextPage: () => dispatchProps.replaceWithNextPage(stateProps.nextPage)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PageLoader);
