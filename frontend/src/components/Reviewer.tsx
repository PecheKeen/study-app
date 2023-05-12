import { useCardsContext } from "../hooks/useCardsContext"
import { Card } from "../App"

type Props = {
  card: Card
  setCard: React.Dispatch<React.SetStateAction<Card>>,
}

export default function Reviewer({ card, setCard }: Props) {
  const { dispatch } = useCardsContext()

  const currTime = Date.now()

  function getNewReviewTime(rating: number, currTime: number) {
    switch (card.reviewCount + rating) {
      case 0: // Next Review in 1 Day (86400000ms)
        return currTime + 86400000
      case 1: // Next Review in 3 Day (259200000ms)
        return currTime + 259200000
      case 2: // Next Review in 1 Week (604800000ms)
        return currTime + 604800000
      case 3: // Next Review in 3 Weeks (1814400000ms)
        return currTime + 1814400000
      case 4: // Next Review in 1 Month (2629746000ms)
        return currTime + 2629746000
      case 5: // Next Review in 3 Months (7889238000ms)
        return currTime + 7889238000
      case 6: // Next Review in 1 Year (31556952000ms)
        return currTime + 31556952000
      default:
        return
    }
  }
  
  
  async function handleReview(rating: number) {

    const updatedCard = {
      nextReview: getNewReviewTime(rating, currTime),
      reviewCount: card.reviewCount + rating
    }

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
      setCard(json)
    }
  }

  return (
    <div className="review-container">
      {card.reviewCount > 0 && <button type="button" className="review-button" onClick={() => handleReview(-1)}>hard</button>}
      <button type="button" className="review-button" onClick={() => handleReview(0)}>mid</button>
      <button type="button" className="review-button" onClick={() => handleReview(1)}>good</button>
    </div>
  )
}