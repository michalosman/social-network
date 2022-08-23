import { Button, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import Avatar from './Avatar'

interface FriendRequestItemProps {
  friendRequest: User
}

function FriendRequestItem({ friendRequest }: FriendRequestItemProps) {
  return (
    <Flex key={friendRequest.id} align="center" gap={3} p={2}>
      <Link to={`profile/${friendRequest.id}`}>
        <Avatar size="60px" src={friendRequest.image} hover />
      </Link>
      <Flex direction="column" gap={2}>
        <Link to={`profile/${friendRequest.id}`}>
          <Text
            fontSize="15px"
            fontWeight="semibold"
            _hover={{ textDecoration: 'underline' }}
          >{`${friendRequest.firstName} ${friendRequest.lastName}`}</Text>
        </Link>
        <Flex gap={2}>
          <Button w="50%" colorScheme="messenger" size="sm">
            Confirm
          </Button>
          <Button w="50%" size="sm" variant="gray">
            Delete
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default FriendRequestItem
