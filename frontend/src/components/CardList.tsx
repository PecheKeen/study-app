import { useCardsContext } from "../hooks/useCardsContext"
import { tCard } from "../App"

type Props = {
  getCard: (id: string) => void
}

export default function CardList({ getCard }: Props) {
  const { cards } = useCardsContext()

  // Map Card Names & Status to List Elements
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