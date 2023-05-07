import { useState } from 'react'
import { cardface } from '../App'
import NewFacecardForm from './NewCardfaceForm'
import CardfaceViewer from './CardfaceViewer'
import { tCard } from '../App'

type Props = {
  card: tCard
  setCard: React.Dispatch<React.SetStateAction<tCard>>,
  setViewMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CardViewer({ card, setCard, setViewMode }: Props) {
  const [showNewFacecardForm, setShowNewFacecardForm] = useState<boolean>(false)

  // Create Cardface Elements
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
      {showNewFacecardForm && <NewFacecardForm card={card} setCard={setCard} setShowNewFacecardForm={setShowNewFacecardForm} />}
      {cardfaceElements}
    </div>
  )
}
