import React from 'react'
// import Card from './components/Card'
import Tile from './components/Tile'
// import List from './components/List'
import { data } from './data'
import { nanoid } from 'nanoid';

export type tCard = {
    id: string,
    title: string,
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
    const [currentCardId, setCurrentCardId] = React.useState(
        (cards[0] && cards[0].id) || ""
    )

    function createNewCard(title: string) {
        const newCard: tCard = {
            id: nanoid(),
            title: title,
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

    function updateCard(title?: string, subtitle?: string,  ) {

    }

    return <div className="main">
        <CardViewer
            currentCard={findCurrentCard()}
        />
        <div className="sidebar">
            <NewCardButton createNewCard={createNewCard} />
            <Tile />
            <List cards={cards} setCurrentCardId={setCurrentCardId} />
        </div>
    </div>
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
            <label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <input type="submit" value="+"/>
        </form>
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
function CardViewer({ currentCard }: any) {
    const [cardFaces, setCardFaces] = React.useState<cardFace[]>([...currentCard.cardFace]);

    function toggleCardFace(id: string) {
        setCardFaces(prevCards => {
            const newCards = [];
            for (let i = 0; i < prevCards.length; i++) {
                const currCard = prevCards[i]
                if (cardFaces[i].id === id) {
                    const updatedCard = {
                        ...currCard,
                        isHidden: !currCard.isHidden
                    }
                    newCards.push(updatedCard)
                } else {
                    newCards.push(currCard)
                }
            }
            console.log(cardFaces)
            return newCards;
        })
    }

    const cardElements = currentCard.cardFace.map((cardFace: cardFace) => {
        return <CardFace key={cardFace.id} id={cardFace.id} cardFace={cardFace} toggleCardFace={toggleCardFace} />
    })

    return (
        <div className="card-container">
            <div className="card-sides">
                <h2 className="card-title">{currentCard && currentCard.title || "New Card"}</h2>
                {cardElements}
            </div>
        </div>
    )
}

//Card Faces
function CardFace(props: any) {
        return (
            <div className="card-face" onClick={() => props.toggleCardFace(props.id)}>
                <h4 className="card-subtitle">{props.cardFace.subtitle}</h4>
                <p className="card-body">{props.cardFace.isHidden ? props.cardFace.body : ''}</p>
                <div className="line"></div>
            </div>
        )
}