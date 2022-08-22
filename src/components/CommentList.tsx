import { Box, Flex } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import * as commentsAPI from '../api/commentsAPI'
import CommentItem from './CommentItem'
import Loading from './Loading'
import Scrollbox from './Scrollbox'

interface CommentListProps {
  postId: string
}

function CommentList({ postId }: CommentListProps) {
  const { data: comments, isLoading: areCommentsLoading } = useQuery<Comment[]>(
    [`comments${postId}`],
    () => commentsAPI.get(postId)
  )

  if (areCommentsLoading || !comments)
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
