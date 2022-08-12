import { Icon, Text } from '@chakra-ui/react'
import { AiFillShop } from 'react-icons/ai'
import { BiTimer } from 'react-icons/bi'
import { FaUserFriends } from 'react-icons/fa'
import { MdGroups, MdKeyboardArrowDown } from 'react-icons/md'

import { user } from '../utils/data.json'
import Avatar from './Avatar'
import MenuButton from './MenuButton'

function Menu() {
  return (
    <aside>
      <MenuButton>
        <Avatar size="36px" src={user.image} />
        <Text
          ml={2}
          fontSize="15px"
        >{`${user.firstName} ${user.lastName}`}</Text>
      </MenuButton>
      <MenuButton>
        <Icon as={FaUserFriends} color="blue.400" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          Friends
        </Text>
      </MenuButton>
      <MenuButton>
        <Icon as={MdGroups} color="blue.400" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          Groups
        </Text>
      </MenuButton>
      <MenuButton>
        <Icon as={AiFillShop} color="blue.400" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          Marketplace
        </Text>
      </MenuButton>
      <MenuButton>
        <Icon as={BiTimer} color="blue.400" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          Memories
        </Text>
      </MenuButton>
      <MenuButton>
        <Icon as={MdKeyboardArrowDown} color="blue.400" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          See more
        </Text>
      </MenuButton>
    </aside>
  )
}

export default Menu
