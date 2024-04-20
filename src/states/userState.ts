let currentUser: API.UserInfo

const setCurrentUser = (user: API.UserInfo) => {
  currentUser = user
}

const getCurrentUser = (): API.UserInfo => {
  return currentUser
}

export {
  setCurrentUser,
  getCurrentUser
}