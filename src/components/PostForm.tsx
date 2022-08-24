import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useState } from 'react'
import { IoMdImages } from 'react-icons/io'
import { Link } from 'react-router-dom'

import cloudinaryAPI from '../api/cloudinaryAPI'
import usePost from '../hooks/usePost'
import useUser from '../hooks/useUser'
import Avatar from './Avatar'

interface CreatePostFormValues {
  text: string
  image: string
}

function PostForm() {
  const { user } = useUser()
  const { createPost } = usePost()
  const {
    isOpen: photoInputOpen,
    onOpen: openPhotoInput,
    onClose: closePhotoInput,
  } = useDisclosure()
  const [imageUploading, setImageUploading] = useState<boolean>(false)

  const formik = useFormik<CreatePostFormValues>({
    initialValues: {
      text: '',
      image: '',
    },
    onSubmit: async (values) => {
      if ((values.text === '' && values.image === '') || imageUploading) return
      createPost(values)
      closePhotoInput()
      formik.resetForm({
        values: {
          text: '',
          image: '',
        },
      })
    },
  })

  const uploadImage = async (files: FileList | null) => {
    if (!files) return
    setImageUploading(true)
    const imageUrl = await cloudinaryAPI.uploadImage(files[0])
    setImageUploading(false)
    formik.values.image = imageUrl
  }

  return (
    <Flex
      direction="column"
      gap={2}
      p={4}
      pb={2}
      bg="white"
      borderRadius="md"
      shadow="base"
    >
      <Flex gap={2} w="100%">
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
      <Divider mt={1} />
      {photoInputOpen && (
        <Flex direction="column" gap={2}>
          <Input
            p={1}
            accept="image/*"
            id="image"
            name="image"
            onChange={(e) => uploadImage(e.target.files)}
            type="file"
          />
          <Flex gap={2}>
            <Button
              w="50%"
              colorScheme="whatsapp"
              disabled={imageUploading}
              onClick={() => formik.handleSubmit()}
            >
              Add post
            </Button>
            <Button w="50%" onClick={closePhotoInput}>
              Cancel
            </Button>
          </Flex>
        </Flex>
      )}
      {!photoInputOpen && (
        <Button
          leftIcon={
            <Box color="whatsapp.500">
              <IoMdImages size="20px" />
            </Box>
          }
          onClick={openPhotoInput}
          variant="ghost"
        >
          <Text color="gray.600">Add photo</Text>
        </Button>
      )}
    </Flex>
  )
}

export default PostForm
