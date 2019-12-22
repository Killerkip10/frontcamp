import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { NewsListContainer } from 'components/News/NewsList';
import { NewsInfoContainer } from 'components/News/NewsInfo';

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/news" component={NewsListContainer} />
      <Route exact path="/news/:index/:topic" component={NewsInfoContainer} />
      <Redirect to="/news" />
    </Switch>
  </BrowserRouter>
);