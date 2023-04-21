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
    innerCards: [],
    stats: {
        reviewCount: number,
        bucket: number,
    }
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
            innerCards: [],
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

    return <div className="main">
        <Card />
        <div className="sidebar">
            <NewCardButton createNewCard={createNewCard} />
            <Tile />
            <List cards={cards}/>
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
        <form onSubmit={handleSubmit}>
            <label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <input type="submit" value="+"/>
        </form>
    )
}