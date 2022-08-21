import { Box, Text } from '@chakra-ui/react'

import FriendRequestItem from './FriendRequestItem'
import Scrollbox from './Scrollbox'

interface FriendRequestListProps {
  friendRequests: User[]
}

function FriendRequestList({ friendRequests }: FriendRequestListProps) {
  return (
    <Box mb={4}>
      <Text
        mb={1}
        ml={2}
        color="gray.600"
        fontSize="17px"
        fontWeight="semibold"
      >
        Friend requests
      </Text>
      <Scrollbox maxH="230px">
        {friendRequests.map((friendRequest) => (
          <FriendRequestItem
            key={friendRequest.id}
            friendRequest={friendRequest}
          />
        ))}
      </Scrollbox>
    </Box>
  )
}

export default FriendRequestList
