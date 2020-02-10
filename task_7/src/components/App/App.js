import React from 'react';
import { Provider } from 'react-redux';

import { store } from 'store';
import { Router } from 'components/Router';

export const App = () => (
  <>
    <Provider store={store}>
      <header>Header</header>  
      <main>
        <Router />
      </main>
      <footer>Footer</footer>
    </Provider>
  </>
);

