// Simple Express server setup to serve for local testing/dev API server
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const jsforce = require('jsforce');
const jwt = require('salesforce-jwt-bearer-token-flow');
const fs = require('fs');

const app = express();
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3002;

const DIST_DIR = './dist';
app.use(express.static(DIST_DIR));

app.listen(PORT, () =>
    console.log(
        `✅  API Server started: http://${HOST}:${PORT}`
    )
);

let conn;
require('dotenv').config();

const { SF_CONSUMER_KEY, SF_USERNAME, SF_LOGIN_URL } = process.env;
let SF_PRIVATE_KEY = process.env.SF_PRIVATE_KEY;
if (!SF_PRIVATE_KEY) {
    SF_PRIVATE_KEY = fs.readFileSync('private.pem').toString('utf8');
}

if (!(SF_CONSUMER_KEY && SF_USERNAME && SF_LOGIN_URL && SF_PRIVATE_KEY)) {
    console.error(
        'Cannot start app: missing environment variables.'
    );
    process.exit(-1);
}

jwt.getToken(
    {
        iss: SF_CONSUMER_KEY,
        sub: SF_USERNAME,
        aud: SF_LOGIN_URL,
        privateKey: SF_PRIVATE_KEY
    },
    (err, tokenResponse) => {
        if (tokenResponse) {
            conn = new jsforce.Connection({
                instanceUrl: tokenResponse.instance_url,
                accessToken: tokenResponse.access_token
            });
        } else if (err) {
            console.error(err);
            process.exit(-1);
        }
    }
);

app.get('/api/records', (_, res) => {
    const soql = `SELECT Id, Name, Artist__c, Year__c, Likes__c, Listening__c, Cover__c
                  FROM Record__c ORDER BY Likes__c DESC, CreatedDate ASC`;
    conn.query(soql, (err, result) => {
        if (err) {
            res.sendStatus(500);
        } else if (result.records.length === 0) {
            res.status(404).send('No record found.');
        } else {
            const formattedData = result.records.map((record) => {
                return {
                    id: record.Id,
                    title: record.Name,
                    artist: record.Artist__c,
                    year: record.Year__c,
                    likes: record.Likes__c,
                    listening: record.Listening__c,
                    cover: record.Cover__c
                };
            });
            res.status(200).send({ data: formattedData });
        }
    });
});

app.patch('/api/records/:recordId', (req, res) => {
    conn.sobject("Record__c").update({ 
        Id: req.body.id,
        Likes__c: req.body.likes
    }, function(err, result) {
        if (err) {
            res.sendStatus(500);
        }
        else if (!result.success) {
            return console.error(err, result);
        }
        else {
            res.status(200).send(result);
        }
    });
});