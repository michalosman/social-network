import { Box, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import Avatar from './Avatar'

interface CommentItemProps {
  comment: Comment
}

function CommentItem({ comment }: CommentItemProps) {
  return (
    <Flex key={comment.id}>
      <Link to={`/profile/${comment.author.id}`}>
        <Avatar size="32px" src="" hover />
      </Link>
      <Box ml={2} pt={1} pb={2} px={2.5} bg="gray.100" borderRadius="2xl">
        <Link to={`/profile/${comment.author.id}`}>
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
  )
}

export default CommentItem
