const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const compression = require('compression');
const bodyParser = require('body-parser');
const chemicalsRouter = require('./routes/chemicalsRoutes');
const toolsRouter = require('./routes/toolsRoutes');
const photoRouter = require('./routes/photoRoutes');
const authRouter = require('./routes/authRoutes');
const experimentRouter = require('./routes/experimentsRoutes');
const app = express();

// Set security HTTP headers
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
// DEVELOPMENT LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser , reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// DATA Sanitization against NoSQL Query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

app.use(compression());

//TEST Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/virtual_lab/api/v1', authRouter);
app.use('/virtual_lab/api/v1/photo', photoRouter);
app.use('/virtual_lab/api/v1/chemicals', chemicalsRouter);
app.use('/virtual_lab/api/v1/tools', toolsRouter);
app.use('/virtual_lab/api/v1/experiment', experimentRouter);
app.use(globalErrorHandler);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

module.exports = app;
