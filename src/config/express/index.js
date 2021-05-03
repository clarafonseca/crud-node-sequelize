const express = require('express');

const app = express();
const routes = require('../../routes/user.routes');

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use('/v1/users', routes);

module.exports = app;
