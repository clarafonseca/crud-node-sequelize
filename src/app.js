const app = require('./config/express');

const port = app.get('port');

app.listen(port, () => console.info(
  `Application currently running on port: ${port}`,
));
