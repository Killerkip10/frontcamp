const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(3030, () => console.log('Server was started on 3030'));