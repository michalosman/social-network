import { Flex, Input } from '@chakra-ui/react'

import data, { posts } from '../utils/data.json'
import Avatar from './Avatar'
import Post from './Post'

const { user } = data

function Feed() {
  return (
    <Flex as="main" direction="column" gap={4}>
      <Flex gap={2} w="100%" p={4} bg="white" borderRadius="md" shadow="base">
        <Avatar src={user.image} hover />
        <Input
          placeholder={`What's on your mind, ${user.firstName}?`}
          type="text"
          variant="round"
        />
      </Flex>
      {posts.map((post) => (
        <Post {...post} key={post.id} />
      ))}
    </Flex>
  )
}

export default Feed
