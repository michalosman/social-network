import { Button, Flex, Icon, Text } from '@chakra-ui/react'
import { AiFillShop } from 'react-icons/ai'
import { BiTimer } from 'react-icons/bi'
import { FaUserFriends } from 'react-icons/fa'
import { MdGroups, MdKeyboardArrowDown } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { user } from '../utils/data.json'
import Avatar from './Avatar'

function Menu() {
  return (
    <Flex as="aside" direction="column" w="100%">
      <Link to="/profile/1">
        <Button w="100%" size="lg" variant="left">
          <Avatar size="36px" src={user.image} />
          <Text
            ml={2}
            fontSize="15px"
          >{`${user.firstName} ${user.lastName}`}</Text>
        </Button>
      </Link>
      <Button size="lg" variant="left">
        <Icon as={FaUserFriends} color="blue.400" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          Friends
        </Text>
      </Button>
      <Button size="lg" variant="left">
        <Icon as={MdGroups} color="blue.400" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          Groups
        </Text>
      </Button>
      <Button size="lg" variant="left">
        <Icon as={AiFillShop} color="blue.400" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          Marketplace
        </Text>
      </Button>
      <Button size="lg" variant="left">
        <Icon as={BiTimer} color="blue.400" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          Memories
        </Text>
      </Button>
      <Button size="lg" variant="left">
        <Icon as={MdKeyboardArrowDown} color="blue.400" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          See more
        </Text>
      </Button>
    </Flex>
  )
}

export default Menu
