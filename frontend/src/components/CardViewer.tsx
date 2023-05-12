import { useState } from 'react'
import NewFacecardForm from './NewCardfaceForm'
import CardfaceViewer from './CardfaceViewer'
import Reviewer from './Reviewer'
import { Card, Cardface } from '../App'
import CardEditor from './CardEditor'

type Props = {
  card: Card
  setCard: React.Dispatch<React.SetStateAction<Card>>,
  setViewMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CardViewer({ card, setCard, setViewMode }: Props) {
  const [isFocus, setIsFocus] = useState<boolean>(false)
  
  const currTime = Date.now()

  // Create Cardface Elements
  const cardfaceElements = card.cardfaces.map((cardface: Cardface) => (
    <CardfaceViewer key={cardface._id} card={card} cardface={cardface} setCard={setCard} />
  ))

  return (
    <div className="card-container">
      <div className="card card-main" onMouseEnter={() => setIsFocus(true)} onMouseLeave={() => setIsFocus(false)}>
        <div className='card-left-bar'>
          {isFocus && (card._id !== 'default' && <CardEditor card={card} setCard={setCard}/>)}
        </div>
        <h2 className="card-title">{card.title}</h2>
        <p className="card-body">{card.body}</p>
        <div className="card-right-bar"></div>
        <div className="line"><hr /></div>
      </div>
      {cardfaceElements}
      <div className="card card-main">
        <NewFacecardForm card={card} setCard={setCard} />
      </div>
      {currTime > card.nextReview && <Reviewer card={card} setCard={setCard} />}
    </div>
  )
}
