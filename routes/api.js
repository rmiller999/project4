const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/sportsall', (req, res) => {

  console.log('going to check api for data')
  axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?city=seattle&apikey=${process.env.API_KEY}`)
    .then(response => {
      // console.log('get data back from api: ', response.data);
      res.json(response.data);
    }).catch(err => {
      console.log('get errors: ', err);
    })
})

router.get('/attractionssall', (req, res) => {

  console.log('going to check api for data')
  axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?city=seattle&classificationName=music&apikey=${process.env.API_KEY}`)
    .then(response => {
      // console.log('get data back from api: ', response.data);
      res.json(response.data);
    }).catch(err => {
      console.log('get errors: ', err);
    })
})

router.get('/comedysall', (req, res) => {

  console.log('going to check api for data')
  axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?city=seattle&classificationName=comedy&apikey=${process.env.API_KEY}`)
    .then(response => {
      // console.log('get data back from api: ', response.data);
      res.json(response.data);
    }).catch(err => {
      console.log('get errors: ', err);
    })
})


module.exports = router;