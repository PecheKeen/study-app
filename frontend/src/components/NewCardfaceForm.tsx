import { useState } from "react"
import { useCardsContext } from "../hooks/useCardsContext"

export default function NewFacecardForm({ card, setCard, setShowNewFacecardForm }: any) {
  const [title, setTitle] = useState<string>("")
  const [body, setBody] = useState<string>("")
  const { dispatch } = useCardsContext()


  async function handleSave() {
    const updatedCard = { cardfaces: [...card.cardfaces, {title: title, body: body, isHidden: true}] }

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
      setShowNewFacecardForm(false)
      setCard(json)
    }
  }

  return <div>
      <button type='button' onClick={() => {setShowNewFacecardForm(false)}}>Cancel</button>
      <button type='button' onClick={handleSave}>Add</button>
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
}
