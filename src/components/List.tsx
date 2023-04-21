export default function List(props: any) {
    const cardElements = props.cards.map((card: any) => (
        <div key={card.id} className="list-item">
            <p className="list-item-title">{card.title}</p>
            <div className="list-item-status"></div>
        </div>
    ))
    cardElements.reverse()

    return (
        <div className="list-container">
            <h3>Browse</h3>
            <div className="list">
                {cardElements}             
            </div>
        </div>
    )
}