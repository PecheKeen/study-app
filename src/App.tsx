import React from 'react'
import Card from './components/Card'
import Tile from './components/Tile'
import List from './components/List'
import { data } from './data'
import { nanoid } from 'nanoid';

type tCard = {
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
            <NewCardButton />
            <Tile />
            <List cards={cards}/>
        </div>
    </div>
}

function NewCardButton() {
    return (
        <form>
            <label>
                <input type="text" name="newCard"/>
            </label>
            <input type="submit" value="+"/>
        </form>
    )
}