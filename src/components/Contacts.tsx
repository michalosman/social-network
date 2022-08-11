import { Box, Button, Text } from '@chakra-ui/react'

import { user } from '../utils/data.json'
import Avatar from './Avatar'

function Contacts() {
  return (
    <Box w="350px" mt={4}>
      <Text
        mb={2}
        ml={2}
        color="gray.500"
        fontSize="17px"
        fontWeight="semibold"
      >
        Contacts
      </Text>
      {user.friends.map((friend) => (
        <Button justifyContent="flex-start" w="100%" px={2} textAlign="left">
          <Avatar size="28px" src={friend.image} />
          <Text ml={2}>{`${friend.firstName} ${friend.lastName}`}</Text>
        </Button>
      ))}
    </Box>
  )
}

export default Contacts
