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

const defaultCard: tCard = {
  _id: 'default',
  title: "Welcome to Jeremy's Study App",
  body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente deserunt distinctio in voluptatum dolore quae explicabo animi obcaecati, error magni.",
  cardFaces: [
    {
      _id: '64541c2128aa517105991a21',
      title: 'First Sub Card',
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum blanditiis sapiente asperiores porro ducimus molestiae."
    },
    {
      _id: '64541c2128aa517105991a22',
      title: 'Second Sub Card',
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum blanditiis sapiente asperiores porro ducimus molestiae."
    },
    {
      _id: '64541c2128aa517105991a23',
      title: 'Third Sub Card',
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum blanditiis sapiente asperiores porro ducimus molestiae."
    }
  ],
  nextReview: 1683079368819,
  reviewCount: 0,
  createdAt: "2023-05-03T02:02:48.826+00:00",
  updatedAt: "2023-05-03T02:02:48.826+00:00",
}

export default function App() {
  const {cards, dispatch} = useCardsContext()
  const [card, setCard] = useState<tCard>(defaultCard)
  const [viewMode, setViewMode] = useState<boolean>(true)

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
    {viewMode ? <CardViewer card={card} viewMode={viewMode} setViewMode={setViewMode} /> : <CardEditor card={card} setCard={setCard} setViewMode={setViewMode} />}
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

function CardViewer({ card, setViewMode }: any) {
  return (
    <div className="card-container">
      {card._id !== 'default' && <button type='button' onClick={() => setViewMode(false)}>Edit</button>}
      <div className="card-main">
        <h2 className="card-title">{card && card.title}</h2>
        <p className="card-body">{card && card.body}</p>
      </div>
    </div>
  )
}

function CardEditor({ card, setCard, setViewMode }: any) {
  const [title, setTitle] = useState(card && card.title)
  const [body, setBody] = useState(card && card.body)
  const { dispatch } = useCardsContext()

  async function handleSave() {
    const response = await fetch('/api/cards/' + card._id, {
      method: 'PATCH',
      body: JSON.stringify(card),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'UPDATE_CARD', payload: json })
    }
  }
    
  async function handleDelete() {
    const response = await fetch('/api/cards/' + card._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_CARD', payload: json })
      setCard(defaultCard)
      setViewMode(true)
    }
  }

  return (
    <div className="card-container">
      <button type='button' onClick={handleSave}>Save</button>
      <button type='button' onClick={() => setViewMode(true)}>Cancel</button>
      <button type='button' onClick={handleDelete}>Delete</button>
      <div className="card-main">
        <h2 className="card-title">{card && card.title}</h2>
        <p className="card-body">{card && card.body}</p>
      </div>
    </div>
  )
}

function CardFaceViewer({ card }: any) {
}