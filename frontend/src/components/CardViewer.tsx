import { useState } from 'react'
import { cardface } from '../App'
import NewFacecardForm from './NewCardfaceForm'
import CardfaceViewer from './CardfaceViewer'

export default function CardViewer({ card, setCard, setViewMode }: any) {
  const [showNewFacecardForm, setShowNewFacecardForm] = useState<boolean>(false)

  const cardfaceElements = card.cardfaces.map((cardface: cardface) => (
    <CardfaceViewer key={cardface._id} card={card} cardface={cardface} setCard={setCard} />
  ))

  return (
    <div className="card-container">
      {card._id !== 'default' && <button type='button' onClick={() => setViewMode(false)}>Edit</button>}
      {card._id !== 'default' && <button type='button' onClick={() => {setShowNewFacecardForm(true)}}>+</button>}
      <div className="card"  >
        <h2 className="card-title">{card.title}</h2>
        <p className="card-body">{card.body}</p>
      </div>
      {cardfaceElements}
      {showNewFacecardForm && <NewFacecardForm card={card} setCard={setCard} setShowNewFacecardForm={setShowNewFacecardForm} />}
    </div>
  )
}
