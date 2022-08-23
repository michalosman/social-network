import { useMutation, useQueryClient } from 'react-query'

import * as postsAPI from '../api/postsAPI'

const usePost = () => {
  const queryClient = useQueryClient()

  const { mutate: createPost } = useMutation(
    (text: string) => postsAPI.createPost(text),
    {
      onSuccess: () => queryClient.invalidateQueries('feed'),
    }
  )

  const { mutate: likePost } = useMutation(
    (postId: string) => postsAPI.likePost(postId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('feed')
        queryClient.invalidateQueries('timeline')
      },
    }
  )

  const { mutate: unlikePost } = useMutation(
    (postId: string) => postsAPI.unlikePost(postId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('feed')
        queryClient.invalidateQueries('timeline')
      },
    }
  )

  return {
    createPost,
    likePost,
    unlikePost,
  }
}

export default usePost
