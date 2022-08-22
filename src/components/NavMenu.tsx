import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { FaUser } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { Link, useNavigate } from 'react-router-dom'

import useAuth from '../contexts/AuthContext'
import Avatar from './Avatar'

function NavMenu() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <Menu autoSelect={false}>
      <MenuButton _hover={{ filter: 'brightness(0.96)' }}>
        <Avatar src={user.image} />
      </MenuButton>
      <MenuList mt={-1} p={2} fontSize="15px">
        <Link to={`/profile/${user.id}`}>
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
          onClick={() => {
            logout()
            navigate('/')
          }}
        >
          <Text fontWeight="semibold">Log Out</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default NavMenu
