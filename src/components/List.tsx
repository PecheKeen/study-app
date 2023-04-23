export default function List(props: any) {
    const cardElements = props.cards.map((card: any) => (
        <div key={card.id} className="list-item" onClick={() => props.setCurrentCardId(card.id)}>
            <p className="list-item-title">{card.title}</p>
            <div className="list-item-status"></div>
        </div>
    ))

    return (
        <div className="list-container">
            <h3>Browse</h3>
            <div className="list">
                {cardElements}             
            </div>
        </div>
    )
}