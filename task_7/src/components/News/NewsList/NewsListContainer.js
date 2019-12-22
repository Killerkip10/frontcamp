import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';

import { NewsList } from './NewsList';
import { getNewsList } from './NewsListEpicActions';
import { changeTopic } from './NewsListActions';

export const NewsListContainerComponent = ({ history, isFetching, news, topic, getNews, changeTopic }) => {
  useEffect(() => { getNews(topic); }, [topic]);

  const handleDetailsClick = useCallback((id, topic) => history.push(`/news/${id}/${topic}`), [history]);
  
  if (isFetching) {
    return <div>...Loading</div>;
  }

  return (
    <NewsList
      news={news}
      topic={topic}
      changeTopic={changeTopic}
      clickDetails={handleDetailsClick}
    />
  );
};

const mapStateToProps = state => ({
  isFetching: state.news.newsList.isFetching,
  news: state.news.newsList.news,
  topic: state.news.newsList.topic,
});

const mapStateToDispatch = dispatch => ({
  getNews: topic => dispatch(getNewsList(topic)),
  changeTopic: topic => dispatch(changeTopic(topic)),
});

const connector = connect(mapStateToProps, mapStateToDispatch);

export const NewsListContainer = connector(NewsListContainerComponent);