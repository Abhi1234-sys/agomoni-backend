
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

// ===============================
// Middleware
// ===============================

app.use(cors());
app.use(express.json());

// Normalize accidental double/multiple leading slashes.
// Example:
// //api/pujas  ->  /api/pujas
// This prevents frontend URL mistakes from causing a 404.
app.use(function (req, res, next) {
  req.url = req.url.replace(/^\/+/, '/');

  console.log('REQUEST:', req.method, req.originalUrl);
  console.log('NORMALIZED:', req.method, req.url);

  next();
});

// ===============================
// API Routes
// ===============================

app.use('/api/pujas', pujaRoutes);
app.use('/api/utilities', utilityRoutes);

// ===============================
// Root Route
// ===============================

app.get('/', function (req, res) {
  res.json({
    success: true,
    message: 'PujoFera API is running...'
  });
});

// ===============================
// API Test Route
// ===============================

app.get('/api/test', function (req, res) {
  res.json({
    success: true,
    message: 'Correct server.js is running',
    time: new Date().toISOString()
  });
});

// ===============================
// 404 Handler
// ===============================

app.use(function (req, res) {
  console.log('404:', req.method, req.originalUrl);

  res.status(404).json({
    success: false,
    message: 'Route not found',
    method: req.method,
    path: req.originalUrl
  });
});

// ===============================
// Error Handler
// ===============================

app.use(function (err, req, res, next) {
  console.error('Server Error:', err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// ===============================
// Start Server
// ===============================

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, function () {
      console.log('=================================');
      console.log('PujoFera Backend Started');
      console.log('Server running on port ' + PORT);
      console.log('MongoDB connected successfully');
      console.log('=================================');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

