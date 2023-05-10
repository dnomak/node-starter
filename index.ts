import dotenv from 'dotenv'

import app from '@/app'

dotenv.config()

const port = process.env.PORT || '3000'

app.listen(port, () => {
  const { npm_package_name, npm_package_version } = process.env
  const time = new Date().toTimeString().slice(0, 8)
  console.log('  ')
  console.log('  ' + npm_package_name + ' ' + npm_package_version + ' ready at ' + time)
  console.log('  ')
  console.log('  ➜  Application: http://localhost:' + port)
  console.log('  ➜  Inspector: chrome://inspect/#devices')
  console.log('  ➜  Press CTRL+C to stop')
  console.log('  ')
})
