import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { CardsContextProvider }from './context/CardsContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CardsContextProvider>
      <App />
    </CardsContextProvider>
  </React.StrictMode>,
)
