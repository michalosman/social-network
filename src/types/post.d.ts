interface Post {
  id: string
  text: string
  author: User
  likes: string[]
  comments: string[]
  createdAt: string
  updatedAt: string
}

interface FeedValues {
  offset: number
  limit: number
}

interface TimelineValues {
  userId: string
  offset: number
  limit: number
}
