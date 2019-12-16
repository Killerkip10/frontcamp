import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { NewsListContainer } from 'components/News/NewsList';
import { NewsInfoContainer } from 'components/News/NewsInfo';

export const routes = (
  <Router>
    <Switch>
      <Route exact path="/news" component={NewsListContainer} />
      <Route exact path="/news/:index/:topic" component={NewsInfoContainer} />
      <Redirect to="/news" />
    </Switch>
  </Router>
);