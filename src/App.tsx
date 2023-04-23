import React from 'react'
import Card from './components/Card'
import Tile from './components/Tile'
import List from './components/List'
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

type cardFace = {
    subtitle: string,
    body: string,
}

export default function App() {
    const [cards, setCards] = React.useState<tCard[]>([]);
    const [currentCardId, setCurrentCardId] = React.useState(
        (cards[0] && cards[0].id) || ""
    )

    function createNewCard(title: string) {
        const newCard: tCard = {
            id: nanoid(),
            title: title,
            dateAdded: Date.now(),
            nextReview: Date.now(),
            cardFace: [{subtitle: "New Card", body: "Write your content here!"}],
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
        <Card
            currentCard={findCurrentCard()}
        />
        <div className="sidebar">
            <NewCardButton createNewCard={createNewCard} />
            <Tile />
            <List cards={cards} setCurrentCardId={setCurrentCardId} />
        </div>
    </div>
}

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