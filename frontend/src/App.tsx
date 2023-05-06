import { useEffect, useState } from 'react'
import { useCardsContext } from './hooks/useCardsContext'

// Component Imports
import NewCardForm from './components/NewCardForm'
import CardEditor from './components/CardEditor'


//Component Types
export type tCard = {
  _id: string,
  title: string,
  body: string,
  cardfaces: cardface[],
  nextReview: number,
  reviewCount: number,
  createdAt: string,
  updatedAt: string,
}

export type cardface = {
  _id: string,
  title: string,
  body: string,
  isHidden: boolean
}


//Default Card
export const defaultCard = {
  _id: 'default',
  title: "Welcome to Jeremy's Study App",
  body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente deserunt distinctio in voluptatum dolore quae error magni.",
  cardfaces: [
    {
      _id: '64541c2128aa517105991a21',
      id: 'default',
      title: 'Getting Started',
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum blanditiis sapiente asperiores porro ducimus molestiae.",
      isHidden: false
    },
    {
      _id: '64541c2128aa517105991a22',
      id: 'default',
      title: 'What is a SRS?',
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum blanditiis sapiente asperiores porro ducimus molestiae.",
      isHidden: false
    },
    {
      _id: '64541c2128aa517105991a23',
      id: 'default',
      title: 'Click Me!',
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum blanditiis sapiente asperiores porro ducimus molestiae.",
      isHidden: true
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
    {viewMode ? <CardViewer card={card} setCard={setCard} setViewMode={setViewMode} />
              : <CardEditor card={card} setCard={setCard} setViewMode={setViewMode} />}
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
function CardViewer({ card, setCard, setViewMode }: any) {
  const cardfaceElements = card.cardfaces.map((cardface: cardface) => (
    <CardfaceViewer key={cardface._id} card={card} cardface={cardface} setCard={setCard} toggleIsHidden={toggleIsHidden} />
  ))

  function toggleIsHidden(id: string) {
    setCard((prevCard:tCard)=> {
      const newCardfaces: cardface[] = []
      for(let i = 0; i < prevCard.cardfaces.length; i++) {
        const currentCardface = prevCard.cardfaces[i]
        if(currentCardface._id === id) {
          const updatedCardface = { ...currentCardface, isHidden: !currentCardface.isHidden }
          newCardfaces.push(updatedCardface)
        } else {
          newCardfaces.push(currentCardface)
        }
      }
      return {...prevCard, cardfaces: newCardfaces}
    })
  }

  return (
    <div className="card-container">
      {card._id !== 'default' && <button type='button' onClick={() => setViewMode(false)}>Edit</button>}
      {card._id !== 'default' && <button type='button' onClick={() => {}}>+</button>}
      <div className="card"  >
        <h2 className="card-title">{card && card.title}</h2>
        <p className="card-body">{card && card.body}</p>
      </div>
      {cardfaceElements}
    </div>
  )
}

function CardfaceViewer({ card, cardface, toggleIsHidden }: any) {
  const [isEditable, setIsEditable] = useState<boolean>(false)
  
  return isEditable ? (<CardfaceEditor card={card} cardface={cardface} setIsEditable={setIsEditable} />)
    : (
        <div key={cardface._id} className='card card-sub' onMouseUp={() => toggleIsHidden(cardface._id)}>
          {cardface.id !== 'default' && <button type='button' onClick={() => {setIsEditable(prevState => !prevState)}}>Edit</button>}
          {<h3 className="card-title">{cardface.title}</h3>}
          <p className="card-body" style={{display: cardface.isHidden ? 'none' : 'block' }}>{cardface.body}</p>
        </div>
    )
}

function CardfaceEditor({ card, cardface, setIsEditable }:any) {
  const [title, setTitle] = useState<string>(cardface.title)
  const [body, setBody] = useState<string>(cardface.body)
  const { dispatch } = useCardsContext()

  async function handleSave() {
    const updatedCardfaces = [...card.cardfaces.filter((e:cardface) => e._id !== cardface._id), {...cardface, title: title, body: body, isHidden: true}]
    const updatedCard = { cardfaces: updatedCardfaces }

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
      setIsEditable(false)
    }
  }
    
  async function handleDelete() {
    const updatedCard = { cardfaces: [...card.cardfaces.filter((e:cardface) => e._id !== cardface._id)] }

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
      setIsEditable(false)
    }
  }

  return (
    <div className="card-container">
      <button type='button' onClick={() => setIsEditable(false)}>Cancel</button>
      <button type='button' onClick={handleSave}>Save</button>
      <button type='button' onClick={handleDelete}>Delete</button>
      <div className="card">
        <input
          type="text"
          className='card-edit-title'
          name='card-title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}>
        </input>
        <textarea
          className='card-edit-body'
          name='card-body'
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </div>
    </div>
  )

}