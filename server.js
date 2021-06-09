// ---Dependencys
const express = require('express');
const path = require('path');
const open = require('open');
const history = require('connect-history-api-fallback');
// -----------------------------------CONFIG-------------------------------
const app = express();
const serveStatic = express.static(path.join(__dirname, 'dist')); // serve static files
const logs = true;
// -----------------------------------MIDDLEWARES-------------------------------
const options = logs ? { verbose: true } : {};
app.use(serveStatic);
app.use(history(options));
app.use(serveStatic);
// -------------------------------------ROUTES---------------------------------
app.get('/', (req, res) => {
  res.render(__dirname + '/dist/index.html');
});
// --------------------------------------SERVER---------------------------------
const port = 3000;
app.listen(port, () => {
  console.log(`Production: Listening ${port} ... `);
  open(`http://localhost:${port}/`);
});
