import { Flex, Input } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'

import * as postAPI from '../api/postsAPI'
import useAuth from '../contexts/AuthContext'
import Avatar from './Avatar'

function PostForm() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const createPostMutation = useMutation(
    (text: string) => postAPI.create(text),
    {
      onSuccess: () => queryClient.invalidateQueries('posts'),
    }
  )

  const formik = useFormik<{ text: string }>({
    initialValues: {
      text: '',
    },
    onSubmit: (values) => {
      createPostMutation.mutate(values.text)
      formik.values.text = ''
    },
  })

  return (
    <Flex gap={2} w="100%" p={4} bg="white" borderRadius="md" shadow="base">
      <Link to="profile/1">
        <Avatar src={user!.image} hover />
      </Link>
      <form onSubmit={formik.handleSubmit} style={{ flex: 1 }}>
        <Input
          id="text"
          name="text"
          onChange={formik.handleChange}
          placeholder={`What's on your mind, ${user!.firstName}?`}
          type="text"
          value={formik.values.text}
          variant="round"
        />
      </form>
    </Flex>
  )
}

export default PostForm
