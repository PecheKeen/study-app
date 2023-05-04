import { useCardsContext } from '../hooks/useCardsContext'

export default function CardViewer({ card }: any) {
  const { dispatch } = useCardsContext()
    
  async function handleDelete() {
  
    const response = await fetch('/api/cards/' + card._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_CARD', payload: json })
    }
  }

  return (
    <div className="card-container">
      <button type='button' onClick={handleDelete}>Delete</button>
      <div className="card-main">
        <h2 className="card-title">{card && card.title}</h2>
        <p className="card-body">{card && card.body}</p>
      </div>
    </div>
  )
}