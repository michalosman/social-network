import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import moment from 'moment'
import { FaRegCommentAlt, FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import useComment from '../hooks/useComment'
import usePost from '../hooks/usePost'
import useUser from '../hooks/useUser'
import Avatar from './Avatar'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

interface PostItemProps {
  post: Post
}

function PostItem({ post }: PostItemProps) {
  const { user } = useUser()
  const { likePost, likePostInfo, unlikePost, unlikePostInfo } = usePost()
  const { comments } = useComment(post.id)
  const { isOpen: commentsOpen, onToggle: toggleCommentsOpen } = useDisclosure()

  const isAlreadyLiked = () => {
    return post.likes.includes(user.id)
  }

  return (
    <Box pb={1} bg="white" borderRadius="md" shadow="base">
      <Flex gap={2} pt={3} pb={2} px={4} role="group">
        <Link to={`/profile/${post.author.id}`}>
          <Avatar src={post.author.image} hover />
        </Link>
        <div>
          <Link to={`/profile/${post.author.id}`}>
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
      {post.text && (
        <Box px={4}>
          <Text>{post.text}</Text>
        </Box>
      )}
      {post.image && <Image w="100%" mt={2.5} src={post.image} />}
      <Flex align="center" justify="space-between" px={4} py={2.5}>
        <Flex align="center">
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
          {comments.length} Comments
        </Text>
      </Flex>
      <Box px={4}>
        <Divider mb={1} />
        <Button
          w="50%"
          color={isAlreadyLiked() ? 'messenger.500' : 'gray.600'}
          isLoading={likePostInfo.isLoading || unlikePostInfo.isLoading}
          leftIcon={isAlreadyLiked() ? <FaThumbsUp /> : <FaRegThumbsUp />}
          onClick={
            isAlreadyLiked()
              ? () => unlikePost(post.id)
              : () => likePost(post.id)
          }
          variant="ghost"
        >
          <Text color={isAlreadyLiked() ? 'messenger.500' : 'default'}>
            Like
          </Text>
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
      </Box>
      {commentsOpen && (
        <Flex direction="column" px={4}>
          <Divider mt={1} mb={4} />
          <CommentForm postId={post.id} />
          <CommentList postId={post.id} />
        </Flex>
      )}
    </Box>
  )
}

export default PostItem
