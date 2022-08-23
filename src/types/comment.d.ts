interface Comment {
  id: string
  text: string
  author: User
  post: string
  createdAt: string
  updatedAt: string
}

interface CreateCommentValues {
  postId: string
  text: string
}
