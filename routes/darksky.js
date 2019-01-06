const express = require('express');
const Request = require('request');
const APIUrl = require('./api');
const router = express.Router();

router.get('/data', (req, res, next) => {

  Request.get(APIUrl + "/32.966904,-96.959011?units=us&exclude=minutely,daily,hourly,flags", (err, response, data) => {
    let info = JSON.parse(data);

    if(err) {
      return console.dir(err);
    } else if(data) {
      res.json(info);
    }
  });
})

module.exports = router;
