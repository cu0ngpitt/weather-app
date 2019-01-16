const express = require('express');
const Request = require('request');
const APIUrl = require('./api');
const router = express.Router();

router.post('/data', (req, res, next) => {
  let lat = req.body.latitude,
      long = req.body.longitude;

  Request.get(APIUrl.darksky + "/" + lat + "," + long + "?units=us&exclude=flags", (error, response, data) => {
    let info = JSON.parse(data);

    if(error) {
      return console.dir(error);
    } else if(data) {
      res.json(info);
    }
  });
})

router.get('/geo', (req, res, next) => {

  Request.get(APIUrl.ipdata, (error, response, data) => {
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
