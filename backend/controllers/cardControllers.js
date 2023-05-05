const Card = require('../models/cardModel')
const mongoose = require('mongoose')

// GET all cards
const getCards = async (req, res) => {
  const cards = await Card.find({})

  res.status(200).json(cards)
}

// GET one card
const getCard = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'no such card id' })
  }

  const card = await Card.findById(id)

  if (!card) {
    return res.status(404).json({ error: 'no such card' })
  }

  res.status(200).json(card)
}

// POST new card
const createCard = async (req, res) => {
  const { id, title, body, cardFaces, nextReview, reviewCount } = req.body

  try {
    const card = await Card.create({ id, title, body, cardFaces, nextReview, reviewCount })
    res.status(200).json(card)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// DELETE a card
const deleteCard = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'no such card id' })
  }

  const card = await Card.findOneAndDelete({ _id: id })

  if (!card) {
    return res.status(404).json({ error: 'no such card' })
  }

  res.status(200).json(card)
}

// UPDATE a card
const updateCard = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'no such card id' })
  }

  const card = await Card.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

  if (!card) {
    return res.status(404).json({ error: 'no such card' })
  }

  res.status(200).json(card)
}

module.exports = {
  getCards,
  getCard,
  createCard,
  deleteCard,
  updateCard
}
