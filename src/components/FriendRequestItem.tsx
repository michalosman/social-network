import { Button, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import useFriendship from '../hooks/useFriendship'
import Avatar from './Avatar'

interface FriendRequestItemProps {
  friendRequest: User
}

function FriendRequestItem({ friendRequest }: FriendRequestItemProps) {
  const { acceptFriend, rejectFriend } = useFriendship()

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
          <Button
            w="50%"
            colorScheme="messenger"
            onClick={() => acceptFriend(friendRequest.id)}
            size="sm"
          >
            Confirm
          </Button>
          <Button
            w="50%"
            onClick={() => rejectFriend(friendRequest.id)}
            size="sm"
            variant="gray"
          >
            Delete
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default FriendRequestItem
