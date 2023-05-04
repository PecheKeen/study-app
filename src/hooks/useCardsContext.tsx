import { CardsContext } from "../context/CardsContext"
import { useContext } from "react"

export function useCardsContext() {
  const context = useContext(CardsContext)

  if (!context) {
    throw Error('useCardsContext must be used inside a CardsContextProvider')
  }

  return context
}