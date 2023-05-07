import { useState } from "react"
import CardfaceEditor from "./CardfaceEditor"

export default function CardfaceViewer({ card, cardface, setCard, toggleIsHidden }: any) {
  const [isEditable, setIsEditable] = useState<boolean>(false)
  
  return isEditable ? (<CardfaceEditor card={card} cardface={cardface} setIsEditable={setIsEditable} setCard={setCard} />)
    : (
        <div key={cardface._id} className='card card-sub' onMouseUp={() => toggleIsHidden(cardface._id)}>
          {cardface.id !== 'default' && <button type='button' onClick={() => {setIsEditable(prevState => !prevState)}}>Edit</button>}
          {<h3 className="card-title">{cardface.title}</h3>}
          <p className="card-body" style={{display: cardface.isHidden ? 'none' : 'block' }}>{cardface.body}</p>
        </div>
    )
}