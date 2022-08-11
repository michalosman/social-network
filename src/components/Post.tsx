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
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box p={4} pb={1} bg="white" borderRadius="md" shadow="base">
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
          onClick={onToggle}
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
        onClick={onToggle}
        variant="ghost"
      >
        Comment
      </Button>
      {!isOpen && <Comments />}
    </Box>
  )
}

export default Post
