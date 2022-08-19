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

interface Post {
  id: string
  text: string
  author: User
  likes: string[]
  comments: string[]
  createdAt: string
  updatedAt: string
}

interface Comment {
  id: string
  text: string
  author: User
  post: string
  createdAt: string
  updatedAt: string
}
