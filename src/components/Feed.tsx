import { Flex, Input } from '@chakra-ui/react'

import data, { posts } from '../utils/data.json'
import Avatar from './Avatar'
import Post from './Post'

const { user } = data

function Feed() {
  return (
    <Flex direction="column" gap={4}>
      <Flex p={4} bg="white" borderRadius="md" shadow="base">
        <Flex gap={2} w="100%">
          <Avatar src={user.image} hover />
          <Input
            placeholder={`What's on your mind, ${user.firstName}?`}
            type="text"
            variant="round"
          />
        </Flex>
      </Flex>
      {posts.map((post) => (
        <Post {...post} />
      ))}
    </Flex>
  )
}

export default Feed
