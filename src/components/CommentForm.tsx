import { Flex, Input } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'

import * as commentsAPI from '../api/commentsAPI'
import Avatar from './Avatar'

interface CommentFormProps {
  postId: string
}

function CommentForm({ postId }: CommentFormProps) {
  const queryClient = useQueryClient()

  const createCommentMutation = useMutation(
    (text: string) => commentsAPI.create(postId, text),
    {
      onSuccess: () => queryClient.invalidateQueries(`comments${postId}`),
    }
  )

  const formik = useFormik<{ text: string }>({
    initialValues: {
      text: '',
    },
    onSubmit: (values) => {
      createCommentMutation.mutate(values.text)
      formik.values.text = ''
    },
  })

  return (
    <Flex gap={2}>
      <Link to="/profile/1">
        <Avatar size="32px" src="" hover />
      </Link>
      <form onSubmit={formik.handleSubmit} style={{ flex: 1 }}>
        <Input
          fontSize="15px"
          id="text"
          name="text"
          onChange={formik.handleChange}
          placeholder="Write a comment..."
          size="sm"
          value={formik.values.text}
          variant="round"
        />
      </form>
    </Flex>
  )
}

export default CommentForm
