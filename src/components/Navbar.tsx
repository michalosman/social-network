import {
  Box,
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'
import { ImExit } from 'react-icons/im'
import { RiSettings5Fill } from 'react-icons/ri'

import data from '../utils/data.json'
import Avatar from './Avatar'

const { user } = data

function Navbar() {
  return (
    <Flex
      as="nav"
      pos="fixed"
      zIndex={100}
      top={0}
      w="100%"
      px={4}
      py={2}
      bg="white"
      shadow="base"
    >
      <Image
        w="40px"
        alt="Facebook logo"
        src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
      />
      <InputGroup mx={2}>
        <InputLeftElement pointerEvents="none">
          <Icon as={BsSearch} color="gray.600" />
        </InputLeftElement>
        <Input
          maxW="240px"
          placeholder="Search Facebook"
          type="text"
          variant="round"
        />
      </InputGroup>
      <Menu>
        <MenuButton _hover={{ filter: 'brightness(0.96)' }}>
          <Avatar src={user.image} />
        </MenuButton>
        <MenuList mt={-1} p={2} fontSize="15px">
          <MenuItem
            px={1}
            borderRadius="md"
            icon={
              <Box p={1.5} bg="gray.200" rounded="full">
                <RiSettings5Fill fontSize="24px" />
              </Box>
            }
          >
            <Text mb={1} fontWeight="semibold">
              Settings
            </Text>
          </MenuItem>
          <MenuItem
            px={1}
            borderRadius="md"
            icon={
              <Box p={2} bg="gray.200" rounded="full">
                <ImExit fontSize="20px" />
              </Box>
            }
          >
            <Text fontWeight="semibold">Log Out</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

export default Navbar
