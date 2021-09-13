require('dotenv').config();

// 3rd Party
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Database setup
const sequelize = require('./config/db');

// Checking Database setup
sequelize
  .authenticate()
  .then(async () => {
    // await sequelize.sync({ force: true });
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Initilizing Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routing
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/faculties', require('./routes/facultyRoutes'));
app.use('/api/v1/enrolments', require('./routes/enrolmentRoutes'));
app.use('/api/v1/studentstatuses', require('./routes/studentStatusRoutes'));
app.use('/api/v1/industrydata', require('./routes/industryDataRoutes'));
app.use(
  '/api/v1/historicperformancedata',
  require('./routes/historicPerformanceDataRoutes')
);
app.use(
  '/api/v1/enrolmentstrategies',
  require('./routes/enrolmentStrategyRoutes')
);
app.use(
  '/api/v1/internaldeadlines',
  require('./routes/internalDeadlineRoutes')
);
app.use(
  '/api/v1/institutionaldeadlines',
  require('./routes/institutionalDeadlineRoutes')
);

// Global Error Handler
app.use(require('./middleware/errorHandler'));

// Server listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
