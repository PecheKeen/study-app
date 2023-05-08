import { useCardsContext } from "../hooks/useCardsContext"
import { Card } from "../App"

type Props = {
  getCard: (id: string) => void
}

export default function CardList({ getCard }: Props) {
  const { cards } = useCardsContext()
  const currTime = Date.now()

  // Map Card Names & Status to List Elements
  const listElements = cards.map((card: Card) => (
    <div key={card._id} className="list-item" onClick={() => getCard(card._id)}>
      <p className="list-item-title">{card.title}</p>
      <div className="list-item-status" style={{backgroundColor: currTime > card.nextReview ? "green" : "gray"}}></div>
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