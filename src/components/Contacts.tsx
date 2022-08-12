import { Box, Button, Flex, Link, Text } from '@chakra-ui/react'

import { user } from '../utils/data.json'
import Avatar from './Avatar'
import MenuButton from './MenuButton'
import Scrollbox from './Scrollbox'

function Contacts() {
  return (
    <Box as="aside" w="100%">
      <Box display={user.friendRequests.length > 0 ? 'block' : 'none'}>
        <Text
          mb={2}
          ml={2}
          color="gray.600"
          fontSize="17px"
          fontWeight="semibold"
        >
          Friend requests
        </Text>
        <Scrollbox maxH="230px">
          {user.friendRequests.map((friendRequest) => (
            <Flex key={friendRequest.id} align="center" gap={4} p={2}>
              <Avatar size="60px" src={friendRequest.image} hover />
              <Flex direction="column" gap={1}>
                <Link
                  fontSize="15px"
                  fontWeight="semibold"
                  href="/"
                >{`${friendRequest.firstName} ${friendRequest.lastName}`}</Link>
                <Flex gap={2}>
                  <Button w="50%" colorScheme="messenger" size="sm">
                    Confirm
                  </Button>
                  <Button w="50%" colorScheme="red" size="sm">
                    Delete
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          ))}
        </Scrollbox>
      </Box>
      <Text
        mt={user.friendRequests.length > 0 ? 4 : 0}
        mb={2}
        ml={2}
        color="gray.600"
        fontSize="17px"
        fontWeight="semibold"
      >
        Contacts
      </Text>
      <Scrollbox maxH="352px">
        {user.friends.map((friend) => (
          <MenuButton key={friend.id}>
            <Avatar size="36px" src={friend.image} />
            <Text
              ml={2}
              fontSize="15px"
            >{`${friend.firstName} ${friend.lastName}`}</Text>
          </MenuButton>
        ))}
      </Scrollbox>
    </Box>
  )
}

export default Contacts
