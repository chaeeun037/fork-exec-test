const express = require('express')
const app = express()
const getPort = require('get-port')
const host = process.env.HOST || '127.0.0.1';

(async () => {
  try{
    let port = await getPort();
    app.set('port', port)

    app.listen(port, host)
    console.log('Child listening on ' + host + ':' + port)
    
  } catch (e) {
    console.error(e)
  }
})()

app.get('/', (req, res) => res.send('Hello World!'))


