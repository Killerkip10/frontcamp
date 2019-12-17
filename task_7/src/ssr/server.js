const express = require('express');
const path = require('path');
const fs = require('fs');

const ReactDOMServer = require('react-dom/server');
import App from '../components/App';

const app = express();

// const htmlTemplate = reactElement => `
//    <!DOCTYPE html>
//    <html>
//       <head>
//          <meta charset="utf-8">
//          <title>React SSR</title>
//       </head>
//
//       <body>
//          <div id="app">${ reactDom }</div>
//          <script src="./app.bundle.js"></script>
//       </body>
//    </html>
// `;


app.use(express.static(path.resolve(__dirname, '../../', 'build')));

app.use('*', (req, res) => {
   fs.readFile(path.resolve(__dirname, '../../', 'build'), (err, data) => {
      if (err) {
         res.sendStatus(500);
      }

      const template = data.replace('<div id="root"></div>', `<div id="root">${ReactDOMServer.renderToString(App)}</div>`);

      return res.send(template);
   });
});

export default app;