import React from 'react';
import { connect } from 'react-redux';

import { NewsInfo } from './NewsInfo';
import { getNewsById } from './NewsInfoEpicActions';

export const NewsInfoContainerComponent = ({ isFetching, info, getNewsById }) => (
  <NewsInfo
    isFetching={isFetching}
    info={info}
    getNewsById={getNewsById}
  />
);

const mapStateToProps = state => ({
  isFetching: state.news.newsInfo.isFetching,
  info: state.news.newsInfo.info,
});

const mapStateToDispatch = (dispatch, { match: { params } }) => ({
  getNewsById: topic => dispatch(getNewsById(params.index, params.topic)),
});

const connector = connect(mapStateToProps, mapStateToDispatch);

export const NewsInfoContainer = connector(NewsInfoContainerComponent);