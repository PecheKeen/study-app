import { ReducerAction, createContext, useReducer } from "react"

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