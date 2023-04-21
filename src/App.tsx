import Card from './components/Card'
import Tile from './components/Tile'
import List from './components/List'

export default function App() {
    return <div className="main">
        <Card />
        <div className="sidebar">
            <Tile />
            <List />
        </div>
    </div>
}