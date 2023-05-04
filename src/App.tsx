import { useEffect, useState } from 'react'
import { useCardsContext } from './hooks/useCardsContext'
import NewCardForm from './components/NewCardForm'

export type tCard = {
    _id: string,
    title: string,
    body: string,
    cardFaces: cardFace[],
    nextReview: number,
    reviewCount: number,
    createdAt: string,
    updatedAt: string,
}

export type cardFace = {
    _id: string,
    title: string,
    body: string,
}

export default function App() {
    const {cards, dispatch} = useCardsContext()
    const [card, setCard] = useState<tCard | undefined>(undefined)

    //Fetch data from DB
    useEffect(() => {
        const fetchCards = async () => {
            const response = await fetch('/api/cards')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_CARDS', payload: json})
            }
        }
        
        fetchCards()
    }, [])

    function getCardById(id: string) {
        setCard(() => {
            return cards.find((card:tCard) => {
                return card._id === id
            }) || cards[0]
        })
    }

    return <div className="main">
        <CardViewer card={card} />
        <Sidebar getCard={getCardById} />
    </div>
}

// Sidebar
function Sidebar({ getCard }: any) {
    return (
        <div className="sidebar">
            <NewCardForm />
            <Tile />
            <List getCard={getCard} />
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
function List({ getCard }: any) {
    const { cards, dispatch } = useCardsContext()

    const listElements = cards.map((card: tCard) => (
        <div key={card._id} className="list-item" onClick={() => getCard(card._id)}>
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
    // Card Update/Edit
    // Card Delete
function CardViewer({ card }: any) {

    return (
        <div className="card-container">
            <div className="card-main">
                <h2 className="card-title">{card && card.title || "Create A New Card"}</h2>
                <p className="card-body">{card && card.body}</p>
            </div>
        </div>
    )
}

// Card Face Viewer
    // Card Face Updater Function
    // Card Face Delete Function
    // Card Face Updater Form
function CardFaceViewer({ card }: any) {
    // let cardElements
    // if (card) {
    //     cardElements = card.cardFaces.map((cardFace: cardFace) => {
    //         if (!cardFace) return;
    //         return (
    //             <div key={cardFace._id} className="cardface">
    //                 <h4 className="cardface-subtitle">{cardFace.title}</h4>
    //                 <p className="cardface-body">{cardFace.body}</p>
    //                 <div className="line"></div>
    //             </div>
    //         )
    //     })
    // }
}