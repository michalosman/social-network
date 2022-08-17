import { Box, Divider, Flex, Input, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { comments } from '../utils/data.json'
import Avatar from './Avatar'
import Scrollbox from './Scrollbox'

function Comments() {
  return (
    <Box mb={4}>
      <Divider mt={1} mb={4} />
      <Flex gap={2} mb={4}>
        <Link to="/profile/1">
          <Avatar size="32px" src="" hover />
        </Link>
        <Input
          fontSize="15px"
          placeholder="Write a comment..."
          size="sm"
          variant="round"
        />
      </Flex>
      <Scrollbox maxH="400px">
        <Flex direction="column" gap={4} pr={2}>
          {comments.map((comment) => (
            <Flex key={comment.id}>
              <Link to="/profile/1">
                <Avatar size="32px" src="" />
              </Link>
              <Box
                ml={2}
                pt={1}
                pb={2}
                px={2.5}
                bg="gray.100"
                borderRadius="2xl"
              >
                <Link to="/profile/1">
                  <Text
                    fontSize="13px"
                    fontWeight="semibold"
                    _hover={{ textDecoration: 'underline' }}
                  >{`${comment.author.firstName} ${comment.author.lastName}`}</Text>
                </Link>
                <Text mt={-1} fontSize="15px">
                  {comment.text}
                </Text>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Scrollbox>
    </Box>
  )
}

export default Comments
