import { useState, useRef } from 'react'
import { useCardsContext } from '../hooks/useCardsContext'

export default function NewCardForm() {
  const { dispatch } = useCardsContext()
  const [title, setTitle] = useState<string>("")
  const [body, setBody] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const dialogRef = useRef<HTMLDialogElement>(null)
    
  function openModal() {
    if(dialogRef.current) dialogRef.current.showModal()
  }

  function closeModal() {
    if(dialogRef.current) dialogRef.current.close()
  }

  async function handleSubmit(e:any) {
    e.preventDefault()

    const newCard = {
      title,
      body,
      cardFaces: [],
      nextReview: Date.now(),
      reviewCount: 0
    }

    const response = await fetch('/api/cards', {
      method: 'POST',
      body: JSON.stringify(newCard),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      console.log(error)
    }
    if (response.ok) {
      setTitle('')
      setBody('')
      setError(null)
      dispatch({type: 'CREATE_CARD', payload: json})
    }
  }
    
  return (
    <>
      <button onClick={openModal}>+</button>
      <dialog className="card-editor-container" ref={dialogRef}>
        <form method='dialog' className='card-editor-form' onSubmit={handleSubmit}>
          <label>Title: </label>
          <input
            type="text"
            id='card-title'
            name='card-title'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label>Body: </label>
          <textarea
            id='card-body'
            name='card-body'
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
          <div>
            <button formMethod='dialog' type='submit' onClick={closeModal}>Add Card</button>
            <button type='button' onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </dialog>
    </>
  )
}