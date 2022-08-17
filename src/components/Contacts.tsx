import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { user } from '../utils/data.json'
import Avatar from './Avatar'
import Scrollbox from './Scrollbox'

function Contacts() {
  return (
    <Box as="aside" w="100%">
      {user.friendRequests.length > 0 && (
        <div>
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
            {user.friendRequests.map((friendRequest) => (
              <Flex key={friendRequest.id} align="center" gap={3} p={2}>
                <Link to="profile/1">
                  <Avatar size="60px" src={friendRequest.image} hover />
                </Link>
                <Flex direction="column" gap={2}>
                  <Link to="profile/1">
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
            ))}
          </Scrollbox>
        </div>
      )}
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
      <Scrollbox maxH="384px">
        {user.friends.map((friend) => (
          <Link to="profile/1">
            <Button key={friend.id} w="100%" py={6} variant="left">
              <Avatar size="36px" src={friend.image} />
              <Text
                ml={2}
                fontSize="15px"
              >{`${friend.firstName} ${friend.lastName}`}</Text>
            </Button>
          </Link>
        ))}
      </Scrollbox>
    </Box>
  )
}

export default Contacts
