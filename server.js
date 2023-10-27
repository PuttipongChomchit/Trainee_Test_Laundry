const express = require('express');
const dry = require('./laundry');
const dotenv = require('dotenv')

const request = require('request')
const env = dotenv.config().parsed

let app = express()

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(__dirname));



app.get("/data", (req, res, next) => {
    res.json(dry)
})

app.get("/", (req, res, next) => {
    res.render('index', { data: dry })
})

app.post("/", express.urlencoded({ extended: true }), (req, res, next) => {
    console.log(req.body)
    let id = req.body.id;
    let mode = req.body.mode;
    let monney = req.body.monney;
    let x = [];

    if (id && mode && monney) {
        for (let i = 0; i < Object.keys(dry[id]['mode']).length; i++) {
            if (dry[id]['mode'][i]['title'] == mode && monney >= dry[id]['mode'][i]['monney']) {
                let n = 1 + +id;
                let time = dry[id]['mode'][i]['time'] * 60 * 1000; // 30 minutes in milliseconds
                let currentDate = new Date();
                let newDate = new Date(currentDate.getTime() + time);
                console.log(i + " : " + id);

                dry[id]['time'] = dry[id]['mode'][i]['time'];
                dry[id]['timeout'] = newDate;//Oct 27, 2023 9:40:00

                x[i] = setInterval(function () {

                    // Get today's date and time
                    var now = new Date().getTime();

                    // Find the distance between now and the count down date
                    var distance = newDate - now;

                    // Time calculations for days, hours, minutes and seconds
                    //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    // Output the result in an element with id="demo"
                    dry[id]['timer'] = " " + hours + "h "
                        + minutes + "m " + seconds + "s ";
                    // If the count down is over, write some text 
                    if (distance < 0) {
                        clearInterval(x[i]);
                        dry[id]['timer'] = "EXPIRED";
                        dry[id]['valid_status'] = true;
                        dry[id]['messenger'] = true;
                    } else {
                        if (minutes < 1 && dry[id]['messenger']) {
                            //Line
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
                                    message: `เครื่องซักผ้าที่ ${(n)} ซักใกล้เสร็จแล้วอย่าลืมไปรับนะคะ ขอบคุณที่ใช้บริการคะ`
                                },
                            }, (err, httpResponse, body) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log(body)
                                }
                            });
                            dry[id]['messenger'] = false;
                        }
                    }
                }, 1000);
                dry[id]['valid_status'] = false;
            }

        }

    } else {
        console.log('nooooooooooooooooooooooooooo');
    }
    res.render('index', { data: dry })
})
/*
app.post("/dry", express.urlencoded({ extended: true }), (req, res, next) => {
    console.log(req.body)
    req.body.mode
    res.sendFile(__dirname + "/selectMod.html")
})

app.get("/dry", (req, res, next) => {
    console.log(req.body)
    res.sendFile(__dirname + "/selectMod.html")
})
*/

app.listen(3000, () => {
    console.log('this server port 3000')
})