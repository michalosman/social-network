import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import commentsAPI from '../api/commentsAPI'

const useComment = (postId: string) => {
  const queryClient = useQueryClient()

  const { data: comments, ...commentsInfo } = useQuery<Comment[]>(
    [`comments${postId}`],
    () => commentsAPI.getComments(postId)
  )

  const { mutate: createComment } = useMutation(commentsAPI.createComment, {
    onSuccess: () => queryClient.invalidateQueries([`comments${postId}`]),
  })

  return {
    comments: comments || [],
    commentsInfo,
    createComment,
  }
}

export default useComment
