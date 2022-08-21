import { Text } from '@chakra-ui/react'

import FriendItem from './FriendItem'
import Scrollbox from './Scrollbox'

interface FriendListProps {
  friends: User[]
}

function FriendList({ friends }: FriendListProps) {
  return (
    <div>
      <Text
        mb={2}
        ml={2}
        color="gray.600"
        fontSize="17px"
        fontWeight="semibold"
      >
        Contacts
      </Text>
      <Scrollbox maxH="384px">
        {friends.map((friend) => (
          <FriendItem key={friend.id} friend={friend} />
        ))}
      </Scrollbox>
    </div>
  )
}

export default FriendList
