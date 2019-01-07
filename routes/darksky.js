const express = require('express');
const Request = require('request');
const APIUrl = require('./api');
const router = express.Router();

router.get('/data', (req, res, next) => {

  Request.get(APIUrl + "/32.966904,-96.959011?units=us&exclude=minutely,hourly,flags", (error, response, data) => {
    let info = JSON.parse(data);

    if(error) {
      return console.dir(error);
    } else if(data) {
      res.json(info);
    }
  });
})

// router.get('/imperial', (req, res, next) => {
//
//   Request.get(APIUrl + "/32.966904,-96.959011?units=us&exclude=flags", (error, response, data) => {
//     let info = JSON.parse(data);
//
//     if(error) {
//       return console.dir(error);
//     } else if(data) {
//       res.json(info);
//     }
//   });
// })

module.exports = router;
