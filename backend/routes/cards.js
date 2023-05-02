const express = require('express')
const { getCards, getCard, createCard, deleteCard, updateCard } = require('../controllers/cardControllers')

const router = express.Router()

// GET all cards
router.get('/', getCards)

// GET single card
router.get('/:id', getCard)

// POST a new card
router.post('/', createCard)

// DELETE a card
router.delete('/:id', deleteCard)

// PATCH a card
router.patch('/:id', updateCard)

module.exports = router
