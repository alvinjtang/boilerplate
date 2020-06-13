const path = require('path');
const express = require('express');
const volleyball = require('volleyball');

const PORT = process.env.PORT || 3000;
const app = express();

const initApp = () => {
  app.use(volleyball);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', require('./api'));

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const listen = () => {
  app.listen(PORT, () => {
    console.log(`****** listening on port ${PORT} ******`);
  });
};

const syncDb = () => db.sync();

const bootApp = () => {
  Promise.all([
    syncDb(),
    initApp(),
    listen()
  ]);
};

if (require.main === module) {
  bootApp();
} else {
  initApp();
}

module.exports = app;
