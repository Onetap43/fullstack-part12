import { createContext, useContext, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return { message: null, type: 'success' }
    default:
      return state
  }
}

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, {
    message: null,
    type: 'success'
  })

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const showNotification = (message, type = 'success') => {
    dispatch({ type: 'SET', payload: { message, type } })
    window.setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
  }

  return { notification, showNotification }
}
