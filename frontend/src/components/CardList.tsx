import { useCardsContext } from "../hooks/useCardsContext"
import { Card } from "../App"

type Props = {
  getCard: (id: string) => void
}

export default function CardList({ getCard }: Props) {
  const { cards } = useCardsContext()
  const currTime = Date.now()

  const sortedCards = cards.sort((a:Card, b:Card) => a.nextReview - b.nextReview)

  // Map Card Names & Status to List Elements
  const listElements = sortedCards.map((card: Card) => {
    let shortTitle = ""
    if (card.title.length >= 45) {
      shortTitle = card.title.slice(0, 40) + "..."
    }

    return (
    <div key={card._id} className="list-item" onClick={() => getCard(card._id)}>
      <div className="list-item-status" style={{backgroundColor: currTime > card.nextReview ? "green" : "gray"}}></div>
      <p className="list-item-title">{shortTitle ? shortTitle : card.title}</p>
    </div>
  )})

  return (
    <div className="list-container">
      <h3>Browse</h3>
      <div className="list">
        {listElements}
      </div>
    </div>
  )
}