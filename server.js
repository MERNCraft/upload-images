/**
 * app.js
 */
require('dotenv').config()
require('./database')
const { PUBLIC } = require('./middleware')
const express = require('express')

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.static(PUBLIC));
app.use(express.json())

require('./routes')(app)

app.get('/ping', (req, res) => {
  const protocol = req.protocol
  const host = req.headers.host
  res.send(`<pre>Connected to ${protocol}://${host}
${Date()}</pre>`)
})

app.listen(PORT, logHostsToConsole)

function logHostsToConsole() {
  // Check what IP addresses are used by your development computer
  const nets = require("os").networkInterfaces()
  const ips = Object.values(nets)
  .flat()
  .filter(({ family }) => (
    family === "IPv4")
  )
  .map(({ address }) => address)

  // ips will include `127.0.0.1` which is the "loopback" address
  // for your computer. This address is not accessible from other
  // computers on your network. The host name  "localhost" can be
  // used as an alias for `127.0.0.1`, so you can add that, too.
  ips.unshift("localhost")

  // Log in the Terminal which URLs can connect to your server
  const hosts = ips.map( ip => (
    `http://${ip}:${PORT}`)
  ).join("\n  ")
  console.log(`Express server listening at:
  ${hosts}
  `);
}
