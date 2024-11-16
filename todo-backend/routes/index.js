const express = require('express');
const { authRoutes, taskRoutes } = require('./routes'); // Import routes from routes/index.js

const app = express();

app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes); // Routes for authentication
app.use('/api/tasks', taskRoutes); // Routes for tasks

// Start the server...
