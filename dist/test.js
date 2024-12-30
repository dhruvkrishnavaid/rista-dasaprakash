"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var https_1 = __importDefault(require("https"));
var apiKey = process.env.RISTA_API_KEY;
var secretKey = process.env.RISTA_SECRET_KEY;
var tokenCreationTime = Math.floor(Date.now() / 1000);
var payload = { iss: apiKey, iat: tokenCreationTime };
//jwt library uses HS256 as default.
var token = jsonwebtoken_1.default.sign(payload, secretKey);
var options = {
    host: 'api.ristaapps.com',
    path: '/v1/branch/list',
    headers: {
        'x-api-key': apiKey,
        'x-api-token': token,
        'content-type': 'application/json'
    }
};
https_1.default.get(options, function (resp) {
    var data = '';
    // A chunk of data has been received.
    resp.on('data', function (chunk) {
        data += chunk;
    });
    // The whole response has been received. Print out the result.
    resp.on('end', function () {
        console.log(data);
    });
}).on("error", function (err) {
    console.log("Error: " + err.message);
});
//# sourceMappingURL=test.js.map