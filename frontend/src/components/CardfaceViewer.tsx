import { useState } from "react"
import CardfaceEditor from "./CardfaceEditor"
import { Card, Cardface } from "../App"

type Props = {
  card: Card,
  cardface: Cardface,
  setCard: React.Dispatch<React.SetStateAction<Card>>
}

export default function CardfaceViewer({ card, cardface, setCard }: Props) {
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [isHidden, setIsHidden] = useState<boolean>(true)
  
  return isEditable ? (<CardfaceEditor card={card} cardface={cardface} setIsEditable={setIsEditable} setCard={setCard} />)
    : (
        <div key={cardface._id} className='card card-sub' onMouseUp={() => setIsHidden(prev => !prev)}>
          {card._id !== 'default' && <button type='button' onClick={() => {setIsEditable(prevState => !prevState)}}>Edit</button>}
          {<h3 className="card-title">{cardface.title}</h3>}
          <p className="card-body" style={{display: isHidden ? 'none' : 'block' }}>{cardface.body}</p>
        </div>
    )
}
