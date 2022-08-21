import { Button, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import Avatar from './Avatar'

interface FriendItemProps {
  friend: User
}

function FriendItem({ friend }: FriendItemProps) {
  return (
    <Link to="profile/1" key={friend.id}>
      <Button w="100%" py={6} variant="left">
        <Avatar size="36px" src={friend.image} />
        <Text
          ml={2}
          fontSize="15px"
        >{`${friend.firstName} ${friend.lastName}`}</Text>
      </Button>
    </Link>
  )
}

export default FriendItem
