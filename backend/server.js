require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cardRoutes = require('./routes/cards')
const schedule = require('node-schedule')

// Express App
const app = express()

// Twilio
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken)

// const everyDayAtNoon = new schedule.RecurrenceRule()
// everyDayAtNoon.tz = 'America/New_York'
// everyDayAtNoon.hour = 12
// everyDayAtNoon.minute = 0

// const sendMessage = schedule.scheduleJob(everyDayAtNoon, () => {
//   message('You have reviews waiting for you in your study app', '+18335013802', '')
// })

// function message(message, from, to) {
//   client.messages
//     .create({
//       body: message,
//       from: `${from}`,
//       to: `${to}`
//     })
//     .then(message => console.log(message.sid));
// }

// Middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Routes
app.use('/api/cards', cardRoutes)

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('listening on port 4000...')
    })
  })
  .catch((error) => {
    console.log(error)
  })
