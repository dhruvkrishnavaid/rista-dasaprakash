import "dotenv/config";
import jwt from 'jsonwebtoken';
import https from 'https';

const apiKey = process.env.RISTA_API_KEY;
const secretKey = process.env.RISTA_SECRET_KEY;
const tokenCreationTime = Math.floor(Date.now() / 1000);
const payload = { iss: apiKey, iat: tokenCreationTime };

//jwt library uses HS256 as default.
const token = jwt.sign(payload, secretKey);
console.log(token);
const options = {
    host: 'api.ristaapps.com',
    path: '/v1/branch/list',
    headers: {
        'x-api-key': apiKey,
        'x-api-token': token,
        'content-type': 'application/json'
    }
};

https.get(options, (resp) => {

    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(data);
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});