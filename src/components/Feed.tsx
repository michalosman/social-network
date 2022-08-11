import { Flex } from '@chakra-ui/react'

import { posts } from '../utils/data.json'
import Post from './Post'

function Feed() {
  return (
    <Flex direction="column" gap={4} mt={4}>
      {posts.map((post) => (
        <Post {...post} />
      ))}
    </Flex>
  )
}

export default Feed
