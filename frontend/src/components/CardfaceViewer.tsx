import { useState } from "react"
import CardfaceEditor from "./CardfaceEditor"

export default function CardfaceViewer({ card, cardface, setCard }: any) {
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [isHidden, setIsHidden] = useState<boolean>(true)
  
  return isEditable ? (<CardfaceEditor card={card} cardface={cardface} setIsEditable={setIsEditable} setCard={setCard} />)
    : (
        <div key={cardface._id} className='card card-sub' onMouseUp={() => setIsHidden(prev => !prev)}>
          {cardface.id !== 'default' && <button type='button' onClick={() => {setIsEditable(prevState => !prevState)}}>Edit</button>}
          {<h3 className="card-title">{cardface.title}</h3>}
          <p className="card-body" style={{display: isHidden ? 'none' : 'block' }}>{cardface.body}</p>
        </div>
    )
}