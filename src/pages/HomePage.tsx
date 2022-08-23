import { Box, Flex } from '@chakra-ui/react'

import FriendList from '../components/FriendList'
import FriendRequestList from '../components/FriendRequestList'
import HomeMenu from '../components/HomeMenu'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'
import useUser from '../hooks/useUser'

function HomePage() {
  const { user, feed, feedInfo } = useUser()

  if (feedInfo.isLoading) return <div />

  return (
    <Flex
      justify={{ base: 'center', lg: 'space-between' }}
      maxW="1920px"
      mt="56px"
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
