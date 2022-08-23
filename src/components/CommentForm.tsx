import { Flex, Input } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'

import * as commentsAPI from '../api/commentsAPI'
import useAuth from '../contexts/AuthContext'
import Avatar from './Avatar'

interface CommentFormProps {
  postId: string
}

interface CreateCommentFormValues {
  text: string
}

function CommentForm({ postId }: CommentFormProps) {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const createCommentMutation = useMutation(commentsAPI.create, {
    onSuccess: () => queryClient.invalidateQueries(`comments${postId}`),
  })

  const formik = useFormik<CreateCommentFormValues>({
    initialValues: {
      text: '',
    },
    onSubmit: (values) => {
      createCommentMutation.mutate({ postId, ...values })
      formik.resetForm()
    },
  })

  return (
    <Flex gap={2} mb={3}>
      <Link to={`/profile/${user.id}`}>
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
