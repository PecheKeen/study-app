import { useState } from "react"
import CardfaceEditor from "./CardfaceEditor"
import { Card, Cardface } from "../App"

type Props = {
  card: Card,
  cardface: Cardface,
  setCard: React.Dispatch<React.SetStateAction<Card>>
}

export default function CardfaceViewer({ card, cardface, setCard }: Props) {
  const [isHidden, setIsHidden] = useState<boolean>(true)
  const [isFocus, setIsFocus] = useState<boolean>(false)
  
  return (
    <div key={cardface._id} className='card cardface-main' onMouseEnter={() => setIsFocus(true)} onMouseLeave={() => setIsFocus(false)}>
      <div className="card-left-bar">
        {isFocus && (card._id !== 'default' && <CardfaceEditor card={card} cardface={cardface} setCard={setCard}/>)}
      </div>
        <h3 className="card-title">{cardface.title}</h3>
        <p className="card-body" style={{ display: isHidden ? 'none' : 'block' }}>{cardface.body}</p>
      <div className="card-right-bar" onClick={() => setIsHidden(prev => !prev)}>{isHidden ?
        <i className='fa-solid fa-angles-up fa-lg' style={{ color: "#555555" }}></i> :
        <i className='fa-solid fa-angles-down fa-lg' style={{ color: "#555555" }}></i>}
      </div>
      <div className="line"><hr /></div>
    </div>
  )
}
