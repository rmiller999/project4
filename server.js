require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const User = require('./models/user');
const Event = require('./models/event');


const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(helmet());

const loginLimiter = new RateLimit({
  windowMs: 5*60*1000,
  max: 3,
  delayMs: 0,
  message: 'Maximum login attempts exceeded!'
})
const signLimiter = new RateLimit({
  windowMs: 60*60*1000,
  max: 3,
  delayMs: 0,
  message: 'Maximum accounts created please try again later.'
})

mongoose.connect('mongodb://localhost/project4', {useNewUrlParser: true});
const db = mongoose.connection;
db.once('open', () => {
  console.log(`Connected to Mongo on ${db.host}:${db.port}`);
});
db.on('error', (err) => {
  console.log(`Database error:\n${err}`);
});

// app.use('/auth/login', loginLimiter);
// app.use('/auth/signup', signLimiter);

app.use('/auth', require('./routes/auth'));
app.use('/api', expressJWT({secret: process.env.JWT_SECRET}), require('./routes/api'));

app.get('/users', (req,res) => {
  User.find({}, function(err,users){
      if (err) res.json(err)
      res.json(users)
  })
})

app.post("/users/:uid/events", (req,res) => {
  Event.create({
  name: req.body.name,
  date: req.body.date
  }, (err, event) => {
  User.findById(req.params.uid, (err, user) => {
    user.events.push(event._id);
    user.save();
    res.json(user);
    })
  })
});

app.delete("/users/:uid/events/:eid", (req,res) => {
  User.findById(req.params.uid, (err, user) => {
    user.events.pull(req.params.eid)
    user.save( err => {
      if (err) res.json(err)
      Event.deleteOne({_id: req.params.eid}, err => {
      if (err) res.json(err)
      res.json(1);
        })
      })
    })
})

app.get('/events/:id', (req,res) => {
  Event.findById(req.params.id, (err, event) => {
  if (err) {
    res.json(err)
  }
  res.json(event)
  })
});


app.listen(process.env.PORT, () => {
  console.log(`Up and running on port ${process.env.PORT}...`);
});
