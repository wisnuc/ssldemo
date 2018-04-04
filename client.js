const tls = require('tls')
const fs = require('fs')

const options = {
  key: fs.readFileSync('client-key.pem'),
  cert: fs.readFileSync('client-cert.pem'),
  ca: [ fs.readFileSync('ca-cert.pem') ]
}

var socket = tls.connect(8000, 'localhost', options, () => {
  console.log('client connected', socket.authorized ? 'authorized' : 'unauthorized')
  process.stdin.pipe(socket)
  process.stdin.resume()
})

socket.setEncoding('utf8')
socket.on('data', data => {
  console.log(data)
  socket.write('hello, I am client!\n')
})

socket.on('error', err => console.log(err))

socket.on('end', () => {
  console.log('Ended')
})
