// require mongoose module
import mongoose from 'mongoose'
// make bluebird default Promise
import Promise from 'bluebird'
// require chalk module to give colors to console text
import chalk from 'chalk'

// plugin bluebird promise in mongoose
mongoose.Promise = Promise
// Color for Actions
const connected = chalk.bold.cyan
const error = chalk.bold.yellow
const termination = chalk.bold.red
const disconnected = chalk.bold.magenta

// Export function
export default () => {
  const URI = process.env.MONGODB_URI as string
  mongoose.connect(URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })

  mongoose.connection.on('connected', () => console.log(connected('Mongoose default connection is open to', URI)))

  mongoose.connection.on('error', err => console.log(error(`Mongoose default connection has occured ${err} error`)))

  mongoose.connection.on('disconnected', () =>
    console.log(disconnected('Mongoose default connection is disconnected'))
  )

  process.on('SIGINT', () =>
    mongoose.connection.close(() => {
      console.log(termination('Mongoose default connection is disconnected due to application termination'))
      process.exit(0)
    })
  )
}
