const express = require('express');
const routes = require('./routes/user.routes');

const app = express();
app.use(express.json());
app.use('/v1/users', routes);
// console.log(`/v1/${routes.name}`)

app.listen(3000, () => {
  console.log(`Application currently running on port: ${3000}`);
});
