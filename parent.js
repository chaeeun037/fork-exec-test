const express = require('express');
const bodyParser = require('body-parser');
const { fork } = require('child_process');
const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3100;

app.use(bodyParser.json());

app.set('port', port);

app.post('/fork', (req, res) => {
  let COMPANY_ID = req.body.COMPANY_ID;
  let DOOR_ID = req.body.DOOR_ID;

  if (!COMPANY_ID) {
    return res.status(400).json( {error: "No COMPANY_ID"} );
  }
  if (!DOOR_ID) {
    return res.status(400).json( {error: "No DOOR_ID"} );
  }

  const forked = fork('child.js');
  forked.send({ COMPANY_ID, DOOR_ID });
});

app.listen(port, host);
console.log('Parent listening on ' + host + ':' + port);