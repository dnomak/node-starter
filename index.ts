import dotenv from 'dotenv'
import * as http from 'http'

import app from '@/app'

dotenv.config()

const port = process.env.PORT || '3000'
const env = process.env.NODE_ENV || 'development'

app.set('port', port)
app.set('env', env)

const server = http.createServer(app)

server.listen(app.get('port'))
server.on('error', onError)
server.on('listening', onListening)

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error
  }
  switch (error.code) {
    case 'EACCES':
      process.exit(1)
      break
    case 'EADDRINUSE':
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  const { npm_package_name, npm_package_version } = process.env
  const time = new Date().toTimeString().slice(0, 8)
  console.log('  ')
  console.log('  ' + npm_package_name + ' ' + npm_package_version + ' ready at ' + time)
  console.log('  ')
  console.log('  ➜  Application: http://localhost:' + app.get('port'))
  console.log('  ➜  Environment: ' + app.get('env'))
  if (app.get('env') === 'development') {
    console.log('  ➜  Inspector: chrome://inspect/#devices')
    console.log('  ➜  Press CTRL+C to stop')
  }
  console.log('  ')
}
