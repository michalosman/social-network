interface Post {
  id: string
  text: string
  image: string
  author: User
  likes: string[]
  comments: string[]
  createdAt: string
  updatedAt: string
}

interface CreatePostValues {
  text: string
  image: string
}

interface TimelineValues {
  userId: string
  page: number
}
