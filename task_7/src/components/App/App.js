import React from 'react';
import { Provider } from 'react-redux';

import { routes } from 'configs/routes';
import { store } from 'configs/store';

export const App = () => (
  <>
    <Provider store={store}>
      <header>Header</header>  
      <main>
        {routes}
      </main>
      <footer>Footer</footer>
    </Provider>
  </>
);

