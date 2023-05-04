import { ReducerAction, createContext, useReducer } from "react"
import { tCard } from "../App"

export const CardsContext = createContext<any>({} as any)

export function cardsReducer(state:any, action:any ) {
  switch (action.type) {
    case 'SET_CARDS':
      return {
        cards: action.payload
      }
    case 'CREATE_CARD':
      return {
        cards: [action.payload, ...state.cards]
      }
    case 'DELETE_CARD':
      return {
        cards: state.cards.filter((card: tCard) => card._id !== action.payload._id)
      }
    default:
      return state
  }
}

export function CardsContextProvider({ children }:any) {
  const [cards, dispatch] = useReducer(cardsReducer, {cards: []})

  return (
    <CardsContext.Provider value={{...cards, dispatch}} >
      { children }
    </CardsContext.Provider>
  )
}