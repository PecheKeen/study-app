const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cardfaceSchema = new Schema({
  title: String,
  body: {
    type: String,
    required: true
  }
})

const cardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: String,
  cardfaces: [cardfaceSchema],
  nextReview: Number,
  reviewCount: Number
}, { timestamps: true })

module.exports = mongoose.model('Card', cardSchema)
