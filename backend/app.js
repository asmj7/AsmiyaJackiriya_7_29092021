const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Gestion des erreurs CORS (accès interdit aux autres serveurs)
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

module.exports = app;