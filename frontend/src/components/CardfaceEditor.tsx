import { useState } from 'react'
import { useCardsContext } from '../hooks/useCardsContext'
import { tCard, cardface } from '../App'

type Props = {
  card: tCard,
  cardface: cardface,
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>
  setCard: React.Dispatch<React.SetStateAction<tCard>>
}


export default function CardfaceEditor({ card, cardface, setIsEditable, setCard }: Props) {
  const [title, setTitle] = useState<string>(cardface.title)
  const [body, setBody] = useState<string>(cardface.body)
  const { dispatch } = useCardsContext()

  // Update Cardfaces on DB
  async function handleSave() {

    const updatedCard = { cardfaces: [
      ...card.cardfaces.filter((e: cardface) => e._id !== cardface._id),
      { ...cardface, title: title, body: body }
    ] }

    const response = await fetch('/api/cards/' + card._id, {
      method: 'PATCH',
      body: JSON.stringify(updatedCard),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'UPDATE_CARD', payload: json})
      setIsEditable(false)
      setCard(json)
    }
  }
  
  // Delete Cardface from DB
  async function handleDelete() {
    const updatedCard = { cardfaces: [...card.cardfaces.filter((ele:cardface) => ele._id !== cardface._id)] }

    const response = await fetch('/api/cards/' + card._id, {
      method: 'PATCH',
      body: JSON.stringify(updatedCard),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'UPDATE_CARD', payload: json})
      setIsEditable(false)
      setCard(json)
    }
  }

  return (
    <div className="card-container">
      <button type='button' onClick={() => setIsEditable(false)}>Cancel</button>
      <button type='button' onClick={handleSave}>Save</button>
      <button type='button' onClick={handleDelete}>Delete</button>
      <div className="card">
        <input
          type="text"
          className='card-edit-title'
          name='card-title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}>
        </input>
        <textarea
          className='card-edit-body'
          name='card-body'
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </div>
    </div>
  )
}