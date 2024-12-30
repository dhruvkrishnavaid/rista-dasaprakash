import express from 'express';
import "dotenv/config";
const jwt = require('jsonwebtoken');

const https = require('https');

import axios from 'axios';
const app = express();

const apiKey = process.env.RISTA_API_KEY;
const secretKey = process.env.RISTA_SECRET_KEY;
const tokenCreationTime = Math.floor(Date.now() / 1000);
const payload = { iss: apiKey, iat: tokenCreationTime };

//jwt library uses HS256 as default.
const token = jwt.sign(payload, secretKey);
const options = {
  host: 'api.ristaapps.com',
  path: '/v1/branch/list',
  headers: {
    'x-api-key': apiKey,
    'x-api-token': token,
    'content-type': 'application/json'
  }
};

app.get('/branches', async (_req, res) => {
  try {
    const response = await axios.get('https://api.ristaapps.com/v1/branch/list', {
      headers: {
        'x-api-key': apiKey,
        'x-api-token': token,
        'content-type': 'application/json'
      }
    });
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', msg: error });
  }
});


app.get('/', (_req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
