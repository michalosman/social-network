import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

import * as postsAPI from '../api/postsAPI'
import * as usersAPI from '../api/usersAPI'
import defaultUser from '../utils/defaultValues'

const useUser = () => {
  const queryClient = useQueryClient()
  const { profileId } = useParams()

  const { data: user, ...userInfo } = useQuery<User>(
    'user',
    usersAPI.getCurrentUser
  )

  const { data: feed, ...feedInfo } = useQuery<Post[]>('feed', () =>
    postsAPI.getFeed({
      offset: 0,
      limit: 10,
    })
  )

  const { mutate: updateUser } = useMutation(
    (updatedFields: UpdateUserValues) => usersAPI.updateUser(updatedFields),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('profile')
        if (profileId && user && profileId === user.id) {
          queryClient.invalidateQueries('user')
        }
      },
    }
  )

  return {
    user: user || defaultUser,
    userInfo,
    feed: feed || [],
    feedInfo,
    updateUser,
  }
}

export default useUser
