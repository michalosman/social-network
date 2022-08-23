import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

import * as usersAPI from '../api/usersAPI'

const useFriendship = () => {
  const queryClient = useQueryClient()
  const { profileId } = useParams()

  const { mutate: requestFriend } = useMutation(
    (otherUserId: string) => usersAPI.requestFriend(otherUserId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        if (profileId) {
          queryClient.invalidateQueries('profile')
        }
      },
    }
  )

  const { mutate: acceptFriend } = useMutation(
    (otherUserId: string) => usersAPI.acceptFriend(otherUserId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        if (profileId) {
          queryClient.invalidateQueries('profile')
        }
      },
    }
  )

  const { mutate: rejectFriend } = useMutation(
    (otherUserId: string) => usersAPI.rejectFriend(otherUserId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        if (profileId) {
          queryClient.invalidateQueries('profile')
        }
      },
    }
  )

  const { mutate: removeFriend } = useMutation(
    (otherUserId: string) => usersAPI.removeFriend(otherUserId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        if (profileId) {
          queryClient.invalidateQueries('profile')
        }
      },
    }
  )

  return {
    requestFriend,
    acceptFriend,
    rejectFriend,
    removeFriend,
  }
}

export default useFriendship
