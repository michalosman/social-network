import { Button, Flex, Icon, Text } from '@chakra-ui/react'
import { AiFillShop } from 'react-icons/ai'
import { BiTimer } from 'react-icons/bi'
import { FaUserFriends } from 'react-icons/fa'
import { MdGroups, MdKeyboardArrowDown } from 'react-icons/md'
import { Link } from 'react-router-dom'

import useAuth from '../contexts/AuthContext'
import Avatar from './Avatar'

function HomeMenu() {
  const { user } = useAuth()

  return (
    <Flex direction="column" w="100%">
      <Link to={`/profile/${user!.id}`}>
        <Button w="100%" size="lg" variant="left">
          <Avatar size="36px" src={user!.image} />
          <Text ml={2} fontSize="15px">{`${user!.firstName} ${
            user!.lastName
          }`}</Text>
        </Button>
      </Link>
      <Button size="lg" variant="left">
        <Icon as={FaUserFriends} color="messenger.500" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          Friends
        </Text>
      </Button>
      <Button size="lg" variant="left">
        <Icon as={MdGroups} color="messenger.500" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          Groups
        </Text>
      </Button>
      <Button size="lg" variant="left">
        <Icon as={AiFillShop} color="messenger.500" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          Marketplace
        </Text>
      </Button>
      <Button size="lg" variant="left">
        <Icon as={BiTimer} color="messenger.500" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          Memories
        </Text>
      </Button>
      <Button size="lg" variant="left">
        <Icon as={MdKeyboardArrowDown} color="messenger.500" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          See more
        </Text>
      </Button>
    </Flex>
  )
}

export default HomeMenu
