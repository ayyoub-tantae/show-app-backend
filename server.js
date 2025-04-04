require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const showRoutes = require('./routes/shows');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/shows', showRoutes);

// Route d'authentification simplifiée
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@showapp.com' && password === 'password123') {
    return res.json({ 
      token: 'fake-jwt-token',
      user: { email, name: 'Admin' }
    });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('API Endpoints:');
  console.log(`- POST   /auth/login`);
  console.log(`- GET    /shows`);
  console.log(`- POST   /shows`);
  console.log(`- PUT    /shows/:id`);
  console.log(`- DELETE /shows/:id`);
});