// Create our app server with express
const express = require('express');
const app = express();

// set up ============================
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');


// routes ============================
const darksky = require('./routes/darksky');

// port ==============================
const port = 3000;

// configuration =====================
app.use(cors());
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (re, res) => {
  res.send('hello world');
});

app.use('/weather', darksky);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// })

app.listen(port, () => {
  console.log('Server is running on port ' + port);
})
