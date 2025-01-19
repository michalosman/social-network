import { Button, Flex, Icon, Text } from '@chakra-ui/react'
import { AiFillShop } from 'react-icons/ai'
import { BiTimer } from 'react-icons/bi'
import { FaGithub, FaLinkedin, FaUserFriends } from 'react-icons/fa'
import { MdGroups, MdKeyboardArrowDown } from 'react-icons/md'
import { Link } from 'react-router-dom'

import useUser from '../hooks/useUser'
import Avatar from './Avatar'

function HomeMenu() {
  const { user } = useUser()

  return (
    <Flex direction="column" w="100%">
      <Link to={`/profile/${user.id}`}>
        <Button w="100%" size="lg" variant="left">
          <Avatar size="36px" src={user.image} />
          <Text
            ml={2}
            fontSize="15px"
          >{`${user.firstName} ${user.lastName}`}</Text>
        </Button>
      </Link>
      <Button size="lg" variant="left">
        <Icon as={FaUserFriends} color="teal.500" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          Friends
        </Text>
      </Button>
      <Button size="lg" variant="left">
        <Icon as={MdGroups} color="teal.500" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          Groups
        </Text>
      </Button>
      <Button size="lg" variant="left">
        <Icon as={AiFillShop} color="teal.500" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          Marketplace
        </Text>
      </Button>
      <Button size="lg" variant="left">
        <Icon as={BiTimer} color="teal.500" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          Memories
        </Text>
      </Button>
      <Button size="lg" variant="left">
        <Icon as={MdKeyboardArrowDown} color="teal.500" fontSize="36px" />
        <Text ml={2} fontSize="15px">
          See more
        </Text>
      </Button>
      <a
        href="https://github.com/michalosman"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button w="100%" mt={12} size="lg" variant="left">
          <Icon as={FaGithub} color="#060606" fontSize="36px" />
          <Text ml={2} fontSize="15px">
            GitHub
          </Text>
        </Button>
      </a>
      <a
        href="https://www.linkedin.com/in/michalosman/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button w="100%" size="lg" variant="left">
          <Icon as={FaLinkedin} color="#0F82BD" fontSize="36px" />
          <Text ml={2} fontSize="15px">
            LinkedIn
          </Text>
        </Button>
      </a>
    </Flex>
  )
}

export default HomeMenu
