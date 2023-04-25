import {data} from '../data'

export default function Card({ currentCard }: any) {

    const cardElements = data.map(card => {
        return (
                <div className="card-face">
                    <h4 className="card-subtitle">{currentCard && currentCard.cardFace.subtitle}</h4>
                    <p className="card-body">{currentCard && currentCard.cardFace.body}</p>
                    <div className="line"></div>
                </div>
        )
    })

    return (
        <div className="card-container">
            <div className="card-sides">
                <h2 className="card-title">{currentCard && currentCard.title || "New Card"}</h2>
            </div>
        </div>
    )
}