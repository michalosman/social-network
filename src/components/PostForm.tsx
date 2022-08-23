import { Flex, Input } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'

import usePost from '../hooks/usePost'
import useUser from '../hooks/useUser'
import Avatar from './Avatar'

interface CreatePostFormValues {
  text: string
}

function PostForm() {
  const { user } = useUser()
  const { createPost } = usePost()

  const formik = useFormik<CreatePostFormValues>({
    initialValues: {
      text: '',
    },
    onSubmit: (values) => {
      createPost(values.text)
      formik.resetForm()
    },
  })

  return (
    <Flex gap={2} w="100%" p={4} bg="white" borderRadius="md" shadow="base">
      <Link to={`profile/${user.id}`}>
        <Avatar src={user.image} hover />
      </Link>
      <form onSubmit={formik.handleSubmit} style={{ flex: 1 }}>
        <Input
          id="text"
          name="text"
          onChange={formik.handleChange}
          placeholder={`What's on your mind, ${user.firstName}?`}
          type="text"
          value={formik.values.text}
          variant="round"
        />
      </form>
    </Flex>
  )
}

export default PostForm
