const tls = require('tls')
const fs = require('fs')

const options = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem'),

  // This is necessary only if using the client certificate authentication.
  requestCert: true,
  // This option only has an effect when requestCert is true and defaults to true.
  // rejectUnauthorized: true,

  ca: [ fs.readFileSync('ca-cert.pem') ]
}

const server = tls.createServer(options, socket => {
  console.log('server connected', socket.authorized ? 'authorized' : 'unauthorized')

  socket.write('hello, welcome to server!\n')
  socket.setEncoding('utf8')
  socket.on('data', data => console.log(data))
  socket.on('error', err => console.log('error', err))
})

server.listen(8000, () => {
  console.log('server bound')
})


