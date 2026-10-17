const storageKey = 'loggedBlogappUser'

const getUser = () => {
  const savedUser = window.localStorage.getItem(storageKey)
  return savedUser ? JSON.parse(savedUser) : null
}

const saveUser = (user) => {
  window.localStorage.setItem(storageKey, JSON.stringify(user))
}

const removeUser = () => {
  window.localStorage.removeItem(storageKey)
}

export default { getUser, saveUser, removeUser }
