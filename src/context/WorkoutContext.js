import React, { useReducer } from 'react'
import { createContext } from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload
      }
    
    case 'ADD_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts]
      }
    
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id )
      }

    case 'UPDATE_WORKOUT':      
      return {
        workouts: [action.payload, ...state.workouts.filter((w) => w._id !== action.payload._id)]
      }

    default:
      return state
  }
}

export const WorkoutsContextProvider = ( {children} ) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null
  })

  return (
    <WorkoutsContext.Provider value={{...state, dispatch}}>
        {children}
    </WorkoutsContext.Provider>
  )
}
