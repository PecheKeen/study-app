import { useState } from 'react'
import NewFacecardForm from './NewCardfaceForm'
import CardfaceViewer from './CardfaceViewer'
import Reviewer from './Reviewer'
import { Card, Cardface } from '../App'

type Props = {
  card: Card
  setCard: React.Dispatch<React.SetStateAction<Card>>,
  setViewMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CardViewer({ card, setCard, setViewMode }: Props) {
  const [showNewFacecardForm, setShowNewFacecardForm] = useState<boolean>(false)

  const currTime = Date.now()

  // Create Cardface Elements
  const cardfaceElements = card.cardfaces.map((cardface: Cardface) => (
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
      {showNewFacecardForm && <NewFacecardForm card={card} setCard={setCard} setShowNewFacecardForm={setShowNewFacecardForm} />}
      {cardfaceElements}
      {currTime > card.nextReview && <Reviewer card={card} setCard={setCard}/>}
    </div>
  )
}
