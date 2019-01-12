
const express = require('express');
const bodyParser = require('body-parser');
const Scaledrone = require('scaledrone-node-push');
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const sd = new Scaledrone({
  channelId: 'giJSOEI9gpOCt4Nx',
  secretKey: 'IGQustebrgl8Y0Xd78uL9lVtnWJEu0Gf'
});

app.post('/vote', (req, res) => {

  sd.publish({
    room: "live-votes",
    message: req.body.playerId
  })

  res.json({
    vote: req.body.playerId
  })


});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});