import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import moment from 'moment'
import { FaRegCommentAlt, FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import Avatar from './Avatar'
import Comments from './Comments'

type Props = {
  id: string
  text: string
  image: string
  createdAt: string
  comments: string[]
  likes: string[]
  author: {
    firstName: string
    lastName: string
    image: string
    id: string
  }
}

function Post({ ...post }: Props) {
  const { isOpen: commentsOpen, onToggle: toggleCommentsOpen } = useDisclosure()

  return (
    <Box p={4} pb={1} bg="white" borderRadius="md" shadow="base">
      <Flex gap={2} role="group">
        <Link to="/profile/1">
          <Avatar src={post.author.image} hover />
        </Link>
        <div>
          <Link to="/profile/1">
            <Text
              mb={-0.5}
              fontSize="15px"
              fontWeight="semibold"
              _hover={{ textDecoration: 'underline' }}
            >{`${post.author.firstName} ${post.author.lastName}`}</Text>
          </Link>
          <Text color="gray.500" fontSize="13px">
            {moment(post.createdAt).fromNow()}
          </Text>
        </div>
      </Flex>
      <Text mt={2}>{post.text}</Text>
      <Flex align="center" justify="space-between">
        <Flex align="center" mt={2}>
          <Box boxSize="21px" p={1} bg="blue.400" rounded="full">
            <FaThumbsUp fontSize="12px" color="white" />
          </Box>
          <Text ml={2} color="gray.500">
            {post.likes.length}
          </Text>
        </Flex>
        <Text
          sx={{ userSelect: 'none' }}
          color="gray.500"
          _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
          onClick={toggleCommentsOpen}
        >
          {post.comments.length} Comments
        </Text>
      </Flex>
      <Divider mt={2} mb={1} />
      <Button
        w="50%"
        color="gray.600"
        leftIcon={<FaRegThumbsUp />}
        variant="ghost"
      >
        Like
      </Button>
      <Button
        w="50%"
        color="gray.600"
        leftIcon={
          <Box mt={1}>
            <FaRegCommentAlt />
          </Box>
        }
        onClick={toggleCommentsOpen}
        variant="ghost"
      >
        Comment
      </Button>
      {commentsOpen && <Comments />}
    </Box>
  )
}

export default Post
