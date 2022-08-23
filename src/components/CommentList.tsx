import { Box, Flex } from '@chakra-ui/react'

import useComment from '../hooks/useComment'
import CommentItem from './CommentItem'
import Loading from './Loading'
import Scrollbox from './Scrollbox'

interface CommentListProps {
  postId: string
}

function CommentList({ postId }: CommentListProps) {
  const { comments, commentsInfo } = useComment(postId)

  if (commentsInfo.isLoading)
    return (
      <Box mt={1} mb={3}>
        <Loading />
      </Box>
    )

  return (
    <Box mt={comments.length !== 0 ? 1 : 0} mb={comments.length !== 0 ? 3 : 0}>
      <Scrollbox maxH="380px">
        <Flex direction="column" gap={4} pr={2}>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </Flex>
      </Scrollbox>
    </Box>
  )
}

export default CommentList
