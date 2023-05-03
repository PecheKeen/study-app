const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cardFaceSchema = new Schema({
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
  body: {
    type: String,
    required: true
  },
  cardFaces: [cardFaceSchema],
  nextReview: Number,
  reviewCount: Number
}, { timestamps: true })

module.exports = mongoose.model('Card', cardSchema)
