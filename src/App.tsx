import { useEffect, useState, useRef } from 'react'
import { nanoid } from 'nanoid';

export type tCard = {
    _id: string,
    title: string,
    body: string,
    nextReview: number,
    cardFaces: cardFace[],
    reviewCount: number,
    bucket: number,
    createdAt: string,
    updatedAt: string,
}

export type cardFace = {
    id: string,
    title: string,
    body: string,
}

export default function App() {
    const [cards, setCards] = useState<tCard[]>([]);

    useEffect(() => {
        const fetchCards = async () => {
            const response = await fetch('/api/cards')
            const json = await response.json()

            if (response.ok) {
                setCards(json)
            }
        }
        
        fetchCards()
    }, [])

    return <div className="main">
        <Sidebar cards={ cards } />
    </div>
}

// Card Editor
function CardEditor() {
    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dialogRef = useRef<HTMLDialogElement>(null)

    console.log(dialogRef)
  
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
        console.log(response, json)

        if (!response.ok) {
            setError(json.error)
            console.log(error)
        }
        if (response.ok) {
            setTitle('')
            setBody('')
            setError(null)
            console.log('new card POSTed', json)
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
                        <button formMethod='dialog' type='submit'>Add Card</button>
                        <button type='button' onClick={closeModal}>Cancel</button>
                    </div>
                </form>
            </dialog>
        </>
    )
}

// Sidebar
function Sidebar({ cards, createNewCard, setCurrentCardId }: any) {
    

    return (
        <div className="sidebar">
            <CardEditor />
            <Tile />
            <List cards={ cards } />
        </div>
    )
}

// Recommendation Tiles
function Tile() {
    return (
        <div className="tiles">
            <h3>Suggested Items</h3>
            <div className="tile-container">
                <div className="tile">
                    <h4 className="tile-title">Linked List - Insert</h4>
                    <div className="tile-rank"></div>
                </div>
                <div className="tile">
                    <h4 className="tile-title">Dijkstra's Algorithm</h4>
                    <div className="tile-rank"></div>
                </div>
                <div className="tile">
                    <h4 className="tile-title">Two Sum</h4>
                    <div className="tile-rank"></div>
                </div>
                <div className="tile">
                    <h4 className="tile-title">Bubble Sort</h4>
                    <div className="tile-rank"></div>
                </div>
                <div className="tile">
                    <h4 className="tile-title">Queue</h4>
                    <div className="tile-rank"></div>
                </div>
                <div className="tile">
                    <h4 className="tile-title"></h4>
                    <div className="tile-rank"></div>
                </div>
            </div>
        </div>
    )
}

// Card List
function List(props: any) {
    const listElements = props.cards.map((card: tCard) => (
        <div key={card._id} className="list-item" onClick={() => console.log('clicked')}>
            <p className="list-item-title">{card.title}</p>
            <div className="list-item-status"></div>
        </div>
    ))
    
    return (
        <div className="list-container">
            <h3>Browse</h3>
            <div className="list">
                {listElements}             
            </div>
        </div>
    )
}

// Card Viewer
// function CardViewer(props: any) {
//     // const cardElements = props.card.cardFaces.map((cardFace: cardFace) => {
//     //     if (!cardFace) return;
//     //     return (
//     //         <div key={cardFace.id} className="cardface">
//     //             <h4 className="cardface-subtitle">{cardFace.title}</h4>
//     //             <p className="cardface-body">{cardFace.body}</p>
//     //             <div className="line"></div>
//     //         </div>
//     //     )
//     // })

//     return (
//         <div className="card-container">
//             <div className="card-sides">
//                 <h2 className="card-title">{props.card && props.card.title || "New Card"}</h2>
//                 <p className="card-body">{props.card && props.card.body}</p>
//                 {/* {cardElements} */}
//             </div>
//         </div>
//     )
// }