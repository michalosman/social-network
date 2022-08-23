import { Button, Flex, Text } from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'

import * as usersAPI from '../api/usersAPI'
import Avatar from './Avatar'

interface FriendRequestItemProps {
  friendRequest: User
}

function FriendRequestItem({ friendRequest }: FriendRequestItemProps) {
  const queryClient = useQueryClient()

  const { mutate: acceptFriend } = useMutation(
    () => usersAPI.acceptFriend(friendRequest.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        queryClient.invalidateQueries('profile')
      },
    }
  )

  const { mutate: rejectFriend } = useMutation(
    () => usersAPI.rejectFriend(friendRequest.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        queryClient.invalidateQueries('profile')
      },
    }
  )

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
            onClick={() => acceptFriend()}
            size="sm"
          >
            Confirm
          </Button>
          <Button
            w="50%"
            onClick={() => rejectFriend()}
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
