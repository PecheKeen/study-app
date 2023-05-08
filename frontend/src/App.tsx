import { useEffect, useState } from 'react'
import { useCardsContext } from './hooks/useCardsContext'

// Component Imports
import NewCardForm from './components/NewCardForm'
import CardEditor from './components/CardEditor'
import CardViewer from './components/CardViewer'
import CardList from './components/CardList'
import RecommendedCardTiles from './components/RecommendedCardTiles'

export default function App() {
  const {cards, dispatch} = useCardsContext()
  const [card, setCard] = useState<Card>(defaultCard)
  const [viewMode, setViewMode] = useState<boolean>(true)

  // Fetch data from DB
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

  // Get Card with ID and Set as current
  function getCardById(id: string) {
    setCard(() => {
      return cards.find((card:Card) => {
        return card._id === id
      }) || cards[0]
    })
  }

  return (
    <div className="main">
      {viewMode ? <CardViewer card={card} setCard={setCard} setViewMode={setViewMode} />
                : <CardEditor card={card} setCard={setCard} setViewMode={setViewMode} />}
      <div className="sidebar">
        <NewCardForm />
        <RecommendedCardTiles />
        <CardList getCard={getCardById} />
      </div>
    </div>
  )
}

// Component Types
export type Card = {
  _id: string,
  title: string,
  body: string,
  cardfaces: Cardface[],
  nextReview: number,
  reviewCount: number,
  createdAt: string,
  updatedAt: string,
}

export type Cardface = {
  _id: string,
  title: string,
  body: string,
}

// Default Card
export const defaultCard = {
  _id: 'default',
  title: "Welcome to Jeremy's Study App",
  body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente deserunt distinctio in voluptatum dolore quae error magni.",
  cardfaces: [
    {
      _id: '64541c2128aa517105991a21',
      title: 'Getting Started',
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum blanditiis sapiente asperiores porro ducimus molestiae.",
    },
    {
      _id: '64541c2128aa517105991a22',
      title: 'What is a SRS?',
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum blanditiis sapiente asperiores porro ducimus molestiae.",
    },
    {
      _id: '64541c2128aa517105991a23',
      title: 'Click Me!',
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum blanditiis sapiente asperiores porro ducimus molestiae.",
    }
  ],
  nextReview: 9683079368819,
  reviewCount: 0,
  createdAt: "2023-05-03T02:02:48.826+00:00",
  updatedAt: "2023-05-03T02:02:48.826+00:00",
}
