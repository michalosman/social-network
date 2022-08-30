import { Flex, Input } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'

import useComment from '../hooks/useComment'
import useUser from '../hooks/useUser'
import Avatar from './Avatar'

interface CommentFormProps {
  postId: string
}

interface CreateCommentFormValues {
  text: string
}

function CommentForm({ postId }: CommentFormProps) {
  const { user } = useUser()
  const { createComment } = useComment(postId)

  const formik = useFormik<CreateCommentFormValues>({
    initialValues: {
      text: '',
    },
    onSubmit: (values) => {
      createComment({ postId, ...values })
      formik.resetForm()
    },
  })

  return (
    <Flex gap={2} mb={3}>
      <Link to={`/profile/${user.id}`}>
        <Avatar size="32px" src={user.image} hover />
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
