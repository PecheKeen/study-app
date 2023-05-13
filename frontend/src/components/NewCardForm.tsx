import { useState, useRef } from 'react'
import { useCardsContext } from '../hooks/useCardsContext'

export default function NewCardForm() {
  const { dispatch } = useCardsContext()
  const [title, setTitle] = useState<string>("")
  const [body, setBody] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const dialogRef = useRef<HTMLDialogElement>(null)
  
  // Open Dialog
  function openDialog() {
    if(dialogRef.current) dialogRef.current.showModal()
  }

  // Close Dialog
  function closeDialog() {
    if(dialogRef.current) dialogRef.current.close()
  }

  // Create New Card on DB
  async function handleSubmit(e:any) {
    e.preventDefault()

    const newCard = {
      title,
      body,
      cardfaces: [],
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
      <button className="new-btn" onClick={openDialog}>+</button>
      <dialog className="card-editor-container" ref={dialogRef}>
        <form method='dialog' className='card-editor-form' onSubmit={handleSubmit}>
          <h3>Add New Card</h3>
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
          <div className="new-dialog-icons">
            <button className="xicon" type='button' onClick={closeDialog}><i className='fa-solid fa-x fa-lg' style={{color: "#ffffff"}}></i></button>
            <button className='checkicon' formMethod='dialog' type='submit' onClick={closeDialog}><i className='fa-solid fa-check fa-lg' style={{color: "#ffffff"}}></i></button>
          </div>
        </form>
      </dialog>
    </>
  )
}