import { Box, Flex, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import FriendList from '../components/FriendList'
import FriendRequestList from '../components/FriendRequestList'
import HomeMenu from '../components/HomeMenu'
import Loading from '../components/Loading'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'
import useUser from '../hooks/useUser'
import LoadingPage from './LoadingPage'

function HomePage() {
  const { user, feed, feedInfo } = useUser()
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      feedInfo.fetchNextPage()
    }
  }, [inView])

  if (feedInfo.isLoading) return <LoadingPage />

  return (
    <Flex
      justify={{ base: 'center', lg: 'space-between' }}
      maxW="1920px"
      mt="56px"
      mb="100px"
      mx="auto"
    >
      <Box
        as="aside"
        flex={1}
        display={{ base: 'none', xl: 'flex' }}
        maxW="360px"
        mt={5}
        ml={2}
      >
        <HomeMenu />
      </Box>
      <Flex
        as="main"
        direction="column"
        flex={2}
        gap={4}
        maxW="744px"
        mt={4}
        px={{ base: 4, lg: 8 }}
      >
        <PostForm />
        <PostList posts={feed} />
        {feedInfo.isFetchingNextPage && feedInfo.hasNextPage && <Loading />}
        {!feedInfo.hasNextPage && feed.length !== 0 && (
          <Text align="center" color="gray.600" fontWeight="semibold">
            No more posts to show
          </Text>
        )}
        <div ref={ref} />
      </Flex>
      <Box
        as="aside"
        flex={1}
        display={{ base: 'none', lg: 'block' }}
        maxW="360px"
        mt={5}
      >
        {user.friendRequests.length > 0 && (
          <FriendRequestList friendRequests={user.friendRequests} />
        )}
        {user.friends.length > 0 && <FriendList friends={user.friends} />}
      </Box>
    </Flex>
  )
}

export default HomePage
