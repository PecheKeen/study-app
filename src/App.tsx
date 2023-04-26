import React from 'react'
// import Card from './components/Card'
// import Tile from './components/Tile'
// import List from './components/List'
import { data } from './data'
import { nanoid } from 'nanoid';

export type tCard = {
    id: string,
    title: string,
    body: string,
    dateAdded: number,
    nextReview: number,
    cardFace: cardFace[],
    stats: {
        reviewCount: number,
        bucket: number,
    }
}

export type cardFace = {
    id: string,
    isHidden: boolean,
    subtitle: string,
    body: string,
}

export default function App() {
    const [cards, setCards] = React.useState<tCard[]>([...data]);
    const [currentCardId, setCurrentCardId] = React.useState((cards[0] && cards[0].id) || "");
    const [editorMode, setEditorMode] = React.useState<boolean>(true);

    function createNewCard(title: string) {
        const newCard: tCard = {
            id: nanoid(),
            title: title,
            body: "",
            dateAdded: Date.now(),
            nextReview: Date.now(),
            cardFace: [{id: nanoid(), isHidden: false, subtitle: "New Card", body: "Write your content here!"}],
            stats: {
                reviewCount: 0,
                bucket: 0,
            }
        }
        setCards(prevCards => [newCard, ...prevCards])
        setCurrentCardId(newCard.id)
    }

    function findCurrentCard() {
        return cards.find(card => {
            return card.id === currentCardId
        }) || cards[0]
    }

    function updateCard(property: string, value: any) {
        setCards(prevCards => prevCards.map((card) => {
            if (card.id === currentCardId) {
                return {
                    ...card,
                    [property]: value
                }
            } else {
                return card
            }
        }))
    }

    function updateCardFace(property: string, value: any, id: string) {
        setCards(prevCards => prevCards.map((card) => {
            if (card.id === currentCardId) {
                return {
                    ...card,
                    cardFace: card.cardFace.map(cardFace => {
                        if (cardFace.id === id) {
                            return { ...cardFace, [property]: value }
                        } else {
                            return cardFace;
                        }
                    })
                }
            } else {
                return card;
            }
        }))
    }

    return <div className="main">
        <CardViewer card={findCurrentCard()} updateCardFace={updateCardFace} />
        {editorMode ? <CardEditor card={findCurrentCard()} updateCard={updateCard} />
                    : <Sidebar cards={cards} createNewCard={createNewCard} setCurrentCardId={setCurrentCardId} />}
    </div>
}

//Card Editor
function CardEditor({card, updateCard}:any) {
    return (
        <div className="card-editor-container">
            <form className='card-editor-form'>
                <label htmlFor="card-title">Title: </label>
                <input
                    className='card-editor-title'
                    type="text"
                    id='card-title'
                    name='card-title' value={card.title}
                    onChange={(e) => updateCard("title", e.target.value)} />
                <label htmlFor="card-body">Body: </label>
                <textarea
                    className='card-editor-body'
                    id='card-body'
                    name='card-body'
                    value={card.body}
                    onChange={(e) => updateCard("body", e.target.value)} />
            </form>
        </div>
    )
}

//Sidebar
function Sidebar({ cards, createNewCard, setCurrentCardId}:any) {
    return (
        <div className="sidebar">
            <NewCardButton createNewCard={createNewCard} />
            <Tile />
            <List cards={cards} setCurrentCardId={setCurrentCardId} />
        </div>
    )
}

//New Card Button
function NewCardButton(props: any) {
    const [title, setTitle] = React.useState<string>("")

    function handleSubmit(event: any) {
        event.preventDefault()
        if (title) {
            props.createNewCard(title);
            setTitle("")
        }
    }

    return (
        <form className="new-card-form" onSubmit={handleSubmit}>
            <label>Title: </label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="submit" value="+"/>
        </form>
    )
}

//Recommendation Tiles
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

//Card List
function List(props: any) {
    const listElements = props.cards.map((card: tCard) => (
        <div key={card.id} className="list-item" onClick={() => props.setCurrentCardId(card.id)}>
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

//Card Viewer
function CardViewer(props: any) {
    const cardElements = props.card.cardFace.map((cardFace: cardFace) => {
        return (
            <div key={cardFace.id} className="cardface" onClick={() => props.updateCardFace('isHidden', !cardFace.isHidden, cardFace.id)}>
                <h4 className="cardface-subtitle">{cardFace.subtitle}</h4>
                <p className="cardface-body">{!cardFace.isHidden && cardFace.body}</p>
                <div className="line"></div>
            </div>
        )
    })

    return (
        <div className="card-container">
            <div className="card-sides">
                <h2 className="card-title">{props.card && props.card.title || "New Card"}</h2>
                <p className="card-body">{props.card && props.card.body}</p>
                {cardElements}
            </div>
        </div>
    )
}