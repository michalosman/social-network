import { Box, Flex, Text } from '@chakra-ui/react'
import moment from 'moment'

import { posts } from '../utils/data.json'
import Avatar from './Avatar'

function Feed() {
  return (
    <Flex direction="column" gap={4} mt={4}>
      {posts.map((post) => (
        <Box p={4} bg="white" borderRadius="md" shadow="base">
          <Flex gap={2}>
            <Avatar src={post.author.image} />
            <Box>
              <Text
                mb={-0.5}
                fontSize="15px"
                fontWeight="semibold"
              >{`${post.author.firstName} ${post.author.lastName}`}</Text>
              <Text color="gray.500" fontSize="13px">
                {moment(post.createdAt).fromNow()}
              </Text>
            </Box>
          </Flex>
          <Text mt={2}>{post.text}</Text>
        </Box>
      ))}
    </Flex>
  )
}

export default Feed
