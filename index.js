require('dotenv').config();
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { handleErrorRequestMiddleware } = require('./src/shared/middleware');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }, { extends: false }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/api/auth', require('./src/modules/auth'));
app.use('/api/users', require('./src/modules/users'));
app.use('/api/markers', require('./src/modules/markers'));
app.use('/api/products', require('./src/modules/products'));
app.use('/api/product-types', require('./src/modules/product-types'));

app.use('*', (req, res) => {
  return res.status(404).json({
    status: 'Not found',
    statusCode: 404,
    message: `Can not find the api path: ${req.path}`,
  });
});
app.use(handleErrorRequestMiddleware);

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log('Connected database successfully');
    app.listen(port, () => {
      console.log('Server is running on port:', port);
    });
  })
  .catch((err) => {
    console.log(
      'An internal error server occurred when starting server. Details: ',
      JSON.stringify(err),
    );
    process.exit(0);
  });
