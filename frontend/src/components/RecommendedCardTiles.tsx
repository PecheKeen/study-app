import { nanoid } from "nanoid"
import { Card } from "../App"

type Props = {
  cards: Card[]
  getCard: (id: string) => void
}

export default function RecommendedCardTiles({ cards, getCard }: Props) {
  const currTime = Date.now()

  // Get most recently added cards that are available for review
  const readyCards: Card[] = cards.filter((card) => card.nextReview < currTime).reverse().slice(0, 6)

  const recElements = readyCards.map((card: Card) => (
    <div key={ card._id} className="tile" onClick={() => getCard(card._id)}>
      <h4 className="tile-title">{card.title}</h4>
      <div className="tile-rank"></div>
    </div>
  ))

  // Pads recElements to 6 elements in length
  while (recElements.length < 6) {
    recElements.push((
      <div key={nanoid()} className="tile">
        <h4 className="tile-title"></h4>
      </div>
    ))

  }

  return (
    <div className="tiles">
      <h3>Suggested Items</h3>
      <div className="tile-container">
        {recElements}
      </div>
    </div>
  )
}