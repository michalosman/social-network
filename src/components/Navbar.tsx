import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { FaUser } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { Link } from 'react-router-dom'

import useAuth from '../contexts/AuthContext'
import Avatar from './Avatar'
import UserSearch from './UserSearch'

function Navbar() {
  const { user, logout } = useAuth()

  return (
    <Box
      as="nav"
      pos="fixed"
      zIndex={100}
      top={0}
      w="100%"
      bg="white"
      shadow="base"
    >
      <Flex
        justify="space-between"
        gap={2}
        maxW="1920px"
        m="auto"
        px={4}
        py={2}
      >
        <Flex gap={2}>
          <a href="/">
            <Image
              w="40px"
              alt="Facebook logo"
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
            />
          </a>
          <UserSearch />
        </Flex>
        <Menu autoSelect={false}>
          <MenuButton _hover={{ filter: 'brightness(0.96)' }}>
            <Avatar src={user!.image} />
          </MenuButton>
          <MenuList mt={-1} p={2} fontSize="15px">
            <Link to="/profile/1">
              <MenuItem
                px={1}
                borderRadius="md"
                icon={
                  <Box p={2} bg="gray.200" rounded="full">
                    <FaUser fontSize="20px" />
                  </Box>
                }
              >
                <Text mb={1} fontWeight="semibold">
                  My profile
                </Text>
              </MenuItem>
            </Link>
            <MenuItem
              px={1}
              borderRadius="md"
              icon={
                <Box p={2} bg="gray.200" rounded="full">
                  <ImExit fontSize="20px" />
                </Box>
              }
              onClick={() => logout()}
            >
              <Text fontWeight="semibold">Log Out</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  )
}

export default Navbar
