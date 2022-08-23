import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import * as postsAPI from '../api/postsAPI'
import * as usersAPI from '../api/usersAPI'
import defaultUser from '../utils/defaultValues'

const useProfile = () => {
  const { profileId } = useParams()

  const { data: profileUser, ...profileUserInfo } = useQuery<User>(
    ['profile', profileId],
    () => usersAPI.getUser(profileId!)
  )

  const { data: timeline, ...timelineInfo } = useQuery<Post[]>(
    ['timeline', profileId],
    () =>
      postsAPI.getTimeline({
        userId: profileId!,
        offset: 0,
        limit: 10,
      })
  )

  return {
    profileUser: profileUser || defaultUser,
    profileUserInfo,
    timeline: timeline || [],
    timelineInfo,
  }
}

export default useProfile
