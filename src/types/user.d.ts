interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  image: string
  friends: User[]
  friendRequests: User[]
  posts: string[]
}

interface RegisterValues {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface LoginValues {
  email: string
  password: string
}

interface SearchValues {
  firstName: string
  lastName: string
  limit: number
}

interface UpdateUserValues {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  image?: string
}
