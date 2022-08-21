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
  const { data: comments, isLoading } = useQuery<Comment[]>(
    [`comments${postId}`],
    () => commentsAPI.get(postId)
  )

  if (isLoading) return <Loading />

  return (
    <Box mb={comments!.length === 0 ? 0 : 4}>
      <Scrollbox maxH="400px">
        <Flex direction="column" gap={4} pr={2}>
          {comments!.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </Flex>
      </Scrollbox>
    </Box>
  )
}

export default CommentList
