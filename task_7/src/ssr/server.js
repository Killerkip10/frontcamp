const express = require('express');
const path = require('path');
const fs = require('fs');

import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';
import App from '../components/App';

const PORT = process.env || 3030;
const app = express();

app.use(express.static(path.resolve(__dirname, '../../', 'build')));

app.use('*', (req, res) => {
   fs.readFile(path.resolve(__dirname, '../../', 'build'), (err, data) => {
      if (err) {
         res.sendStatus(500);
      }

      const context = {};
      const store = createStore();
      const reduxState = store.getState();
      const jsx = (
          <ReduxProvider store={store}>
             <StaticRouter context={context} location={req.url}>
                <App />
             </StaticRouter>
          </ReduxProvider>
      );
      const reactDom = renderToString(jsx);

      const template = data.replace(
          '<div id="root"></div>',
          `<div id="root">${reactDom}</div><script>window.REDUX_DATA = ${JSON.stringify(reduxState)}</script>`
      );

      return res.send(template);
   });
});

app.listen(PORT, () => console.log(`Server was started on ${PORT}`));