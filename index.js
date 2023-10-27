const line = require('@line/bot-sdk')
const express = require('express');
const axios = require('axios').default
const dotenv = require('dotenv')

const bodyParser = require('body-parser')
const request = require('request')

const env = dotenv.config().parsed

let app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(3000, () => {
    const url_line_notification = "https://notify-api.line.me/api/notify";

    request({
        method: 'POST',
        uri: url_line_notification,
        header: {
            'Content-Type': 'multipart/form-data',
        },
        auth: {
            bearer: process.env.TOKEN,
        },
        form: {
            message: 'Test Message!'
        },
    }, (err, httpResponse, body) => {
        if (err) {
            console.log(err)
        } else {
            console.log(body)
        }
    });
    console.log('listening on 3000')
});