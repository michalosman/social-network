import { Flex, Input } from '@chakra-ui/react'

import data from '../utils/data.json'
import Avatar from './Avatar'

const { user } = data

function PostForm() {
  return (
    <Flex p={4} bg="white" borderRadius="md" shadow="base">
      <Flex gap={2} w="100%">
        <Avatar src={user.image} />
        <Input
          placeholder={`What's on your mind, ${user.firstName}?`}
          type="text"
          variant="round"
        />
      </Flex>
    </Flex>
  )
}

export default PostForm
