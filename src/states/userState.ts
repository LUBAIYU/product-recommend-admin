let currentUser: API.UserInfo | null

const setCurrentUser = (user: API.UserInfo | null) => {
  currentUser = user
}

const getCurrentUser = (): API.UserInfo | null => {
  return currentUser
}

export {
  setCurrentUser,
  getCurrentUser
}