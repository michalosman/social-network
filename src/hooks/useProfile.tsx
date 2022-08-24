import { useInfiniteQuery, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import postsAPI from '../api/postsAPI'
import usersAPI from '../api/usersAPI'
import defaultUser from '../utils/defaultValues'

const useProfile = () => {
  const { profileId } = useParams()

  const { data: profileUser, ...profileUserInfo } = useQuery<User>(
    ['profile', profileId],
    () => usersAPI.getUser(profileId!)
  )

  const { data: timeline, ...timelineInfo } = useInfiniteQuery<Post[]>(
    ['timeline', profileId],
    ({ pageParam = 1 }) =>
      postsAPI.getTimeline({
        userId: profileId!,
        page: pageParam,
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) return undefined
        const nextPage = allPages.length + 1
        return nextPage
      },
    }
  )

  return {
    profileUser: profileUser || defaultUser,
    profileUserInfo,
    timeline: timeline?.pages.flat() || [],
    timelineInfo,
  }
}

export default useProfile
