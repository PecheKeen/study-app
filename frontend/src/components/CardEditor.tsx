import { useState } from 'react'
import { useCardsContext } from '../hooks/useCardsContext'
import { defaultCard } from '../App'

// Card Editor
export default function CardEditor({ card, setCard, setViewMode }: any) {
  const [title, setTitle] = useState(card && card.title)
  const [body, setBody] = useState(card && card.body)
  const { dispatch } = useCardsContext()

  async function handleSave() {
    const updatedCard = {title: title, body: body}
    const response = await fetch('/api/cards/' + card._id, {
      method: 'PATCH',
      body: JSON.stringify(updatedCard),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'UPDATE_CARD', payload: json })
      setCard(json)
      setViewMode(true)
    }
  }
    
  async function handleDelete() {
    const response = await fetch('/api/cards/' + card._id, {
      method: 'DELETE'
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_CARD', payload: json })
      setCard(defaultCard)
      setViewMode(true)
    }
  }

  return (
    <div className="card-container">
      <button type='button' onClick={() => setViewMode(true)}>Cancel</button>
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