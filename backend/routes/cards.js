const express = require('express')
const Card = require('../models/cardModel')

const router = express.Router()

// GET all cards
router.get('/', (req, res) => {
  res.json({ msg: 'GET all cards' })
})

// GET single card
router.get('/:id', (req, res) => {
  res.json({ msg: 'GET one card' })
})

// POST a new card
router.post('/', async (req, res) => {
  const { id, title, body, cardFaces, nextReview, reviewCount } = req.body

  try {
    const card = await Card.create({ id, title, body, cardFaces, nextReview, reviewCount })
    res.status(200).json(card)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

  res.json({ msg: 'POST a new card' })
})

// DELETE a card
router.delete('/:id', (req, res) => {
  res.json({ msg: 'DELETE a card' })
})

// UPDATE a card
router.patch('/:id', (req, res) => {
  res.json({ msg: 'UPDATE a card' })
})

module.exports = router
