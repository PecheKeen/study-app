import { useState, useRef } from 'react'
import { useCardsContext } from '../hooks/useCardsContext'
import { Card, Cardface } from '../App'

type Props = {
  card: Card,
  cardface: Cardface,
  setCard: React.Dispatch<React.SetStateAction<Card>>
}


export default function CardfaceEditor({ card, cardface, setCard }: Props) {
  const [title, setTitle] = useState<string>(cardface.title)
  const [body, setBody] = useState<string>(cardface.body)
  const { dispatch } = useCardsContext()

  const dialogRef = useRef<HTMLDialogElement>(null)

  // Open Dialog
  function openDialog() {
    if(dialogRef.current) dialogRef.current.showModal()
  }

  // Close Dialog
  function closeDialog() {
    if(dialogRef.current) dialogRef.current.close()
  }

  // Update Cardfaces on DB
  async function handleSave() {

    const updatedCard = { cardfaces: [
      ...card.cardfaces.filter((e: Cardface) => e._id !== cardface._id),
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
      closeDialog()
      setCard(json)
    }
  }
  
  // Delete Cardface from DB
  async function handleDelete() {
    const updatedCard = { cardfaces: [...card.cardfaces.filter((ele:Cardface) => ele._id !== cardface._id)] }

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
      closeDialog()
      setCard(json)
    }
  }

  return (
    <>
      <button onClick={openDialog}><i className='fa-solid fa-pen-to-square fa-lg' style={{color: "#ffffff"}}></i></button>
      <dialog className="card-editor-container" ref={dialogRef}>
        <form method='dialog' className='card-editor-form' >
          <h3>Edit Card Field</h3>
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
          <div className="edit-dialog-icons">
            <button className='trashicon' type='button' onClick={handleDelete}><i className='fa-solid fa-trash-can fa-lg' style={{color: "#ffffff"}}></i></button>
            <button className='xicon' type='button' onClick={closeDialog}><i className='fa-solid fa-x fa-lg' style={{ color: "#ffffff" }}></i></button>
            <button className='checkicon' formMethod='dialog' type='submit' onClick={handleSave}><i className='fa-solid fa-check fa-lg' style={{ color: "#ffffff" }}></i></button>
          </div>
        </form>
      </dialog>
    </>
  )
}