```js
// server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Route imports
const pujaRoutes = require('./routes/pujaRoutes');
const utilityRoutes = require('./routes/utilityRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use(function (req, res, next) {
  console.log('REQUEST:', req.method, req.originalUrl);
  next();
});

// API Routes
app.use('/api/pujas', pujaRoutes);
app.use('/api/utilities', utilityRoutes);

// Root route
app.get('/', function (req, res) {
  res.send('PujoFera API is running...');
});

// API test route
app.get('/api/test', function (req, res) {
  res.json({
    message: 'Correct server.js is running',
    time: new Date().toISOString()
  });
});

// 404 handler
app.use(function (req, res) {
  console.log('404:', req.method, req.originalUrl);

  res.status(404).json({
    success: false,
    message: 'Route not found',
    method: req.method,
    path: req.originalUrl
  });
});

// Error handler
app.use(function (err, req, res, next) {
  console.error('Server Error:', err);

  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start server
async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, function () {
      console.log('Server running on port ' + PORT);
      console.log('API server started successfully');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
```
