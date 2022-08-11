import {
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'

import data from '../utils/data.json'
import Avatar from './Avatar'

const { user } = data

function Navbar() {
  return (
    <Flex px={4} py={2} bg="white" shadow="base">
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
      <Avatar src={user.image} />
    </Flex>
  )
}

export default Navbar
