import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'
import { useParams } from 'react-router-dom'

import postsAPI from '../api/postsAPI'
import usersAPI from '../api/usersAPI'
import defaultUser from '../utils/defaultValues'
import useAuth from './useAuth'

const useUser = () => {
  const queryClient = useQueryClient()
  const { profileId } = useParams()
  const { user: currentUser } = useAuth()

  const { data: user, ...userInfo } = useQuery<User>(
    'user',
    usersAPI.getCurrentUser
  )

  const { data: feed, ...feedInfo } = useInfiniteQuery<Post[]>(
    ['feed', currentUser],
    ({ pageParam = 1 }) => postsAPI.getFeed(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) return undefined
        const nextPage = allPages.length + 1
        return nextPage
      },
    }
  )

  const { mutate: updateUser } = useMutation(usersAPI.updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile')
      if (profileId && user && profileId === user.id) {
        queryClient.invalidateQueries('user')
      }
    },
  })

  return {
    user: user || defaultUser,
    userInfo,
    feed: feed?.pages.flat() || [],
    feedInfo,
    updateUser,
  }
}

export default useUser
