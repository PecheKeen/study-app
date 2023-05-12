import { useState, useRef } from "react"
import { useCardsContext } from "../hooks/useCardsContext"
import { Card } from "../App"

type Props = {
  card: Card
  setCard: React.Dispatch<React.SetStateAction<Card>>,
}

export default function NewFacecardForm({ card, setCard }: Props) {
  const { dispatch } = useCardsContext()
  const [title, setTitle] = useState<string>("")
  const [body, setBody] = useState<string>("")

  const dialogRef = useRef<HTMLDialogElement>(null)

  // Open Dialog
  function openDialog() {
    if(dialogRef.current) dialogRef.current.showModal()
  }

  // Close Dialog
  function closeDialog() {
    if(dialogRef.current) dialogRef.current.close()
  }

  // Create New Cardface on DB
  async function handleSave() {
    const updatedCard = { cardfaces: [...card.cardfaces, {title: title, body: body }] }

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
      closeDialog()
      setCard(json)
    }
  }
  return <>
      <button className="new-btn" onClick={openDialog}>+</button>
      <dialog className="card-editor-container" ref={dialogRef}>
        <form method='dialog' className='card-editor-form' onSubmit={handleSave}>
          <h3>Add New Card Field</h3>
          <input
            type="text"
            id='card-title'
            name='card-title'
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title'
            value={title}
          />
          <textarea
            id='card-body'
            name='card-body'
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
          <div>
            <button formMethod='dialog' type='submit' onClick={closeDialog}>Add Card</button>
            <button type='button' onClick={closeDialog}>Cancel</button>
          </div>
        </form>
      </dialog>
    </>
}
