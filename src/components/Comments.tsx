import { Box, Divider, Flex, Input, Text } from '@chakra-ui/react'

import { comments } from '../utils/data.json'
import Avatar from './Avatar'
import Scrollbox from './Scrollbox'

function Comments() {
  return (
    <Box mb={4}>
      <Divider mt={1} mb={4} />
      <Flex gap={2} mb={4}>
        <Avatar size="32px" src="" />
        <Input
          fontSize="15px"
          placeholder="Write a comment..."
          size="sm"
          variant="round"
        />
      </Flex>
      <Scrollbox maxH="350px">
        <Flex direction="column" gap={4} pr={2}>
          {comments.map((comment) => (
            <Flex key={comment.id}>
              <Avatar size="32px" src="" />
              <Box ml={2} px={3} py={2} bg="gray.100" borderRadius="2xl">
                <Text
                  mb={-1}
                  fontSize="13px"
                  fontWeight="bold"
                >{`${comment.author.firstName} ${comment.author.lastName}`}</Text>
                <Text fontSize="15px">{comment.text}</Text>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Scrollbox>
    </Box>
  )
}

export default Comments
