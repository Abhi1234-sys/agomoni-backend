// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//Route Import
const pujaRoutes = require('./routes/pujaRoutes');
const utilityRoutes = require('./routes/utilityRoutes');

dotenv.config();

// MongoDB Connect
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/pujas', pujaRoutes);
app.use('/api/utilities', utilityRoutes);

app.get('/', (req, res) => {
  res.send('PujoFera API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});