import {
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { users } from '../utils/data.json'
import Avatar from './Avatar'
import Scrollbox from './Scrollbox'

function UserSearch() {
  const [searchedUser, setSearchedUser] = useState('')

  const results = users.filter((user) => {
    const regex = new RegExp(searchedUser, 'gi')
    return `${user.firstName} ${user.lastName}`.match(regex)
  })

  return (
    <Box pos="relative">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={BsSearch} color="gray.600" />
        </InputLeftElement>
        <Input
          maxW="240px"
          onChange={(e) => setSearchedUser(e.target.value)}
          placeholder="Search Facebook"
          type="text"
          value={searchedUser}
          variant="round"
        />
      </InputGroup>
      {searchedUser && (
        <Box
          pos="absolute"
          w="240px"
          p={2}
          bg="white"
          borderRadius="md"
          shadow="lg"
        >
          <Scrollbox maxH="192px">
            {results.map((user) => (
              <Link to="/profile/1">
                <Button
                  justifyContent="flex-start"
                  w="100%"
                  px={2}
                  py={1}
                  textAlign="left"
                  onClick={() => setSearchedUser('')}
                  size="lg"
                  variant="ghost"
                >
                  <Avatar size="36px" src={user.image} />
                  <Text
                    ml={2}
                    fontSize="15px"
                  >{`${user.firstName} ${user.lastName}`}</Text>
                </Button>
              </Link>
            ))}
            {!results.length && (
              <Text align="center" color="gray.500">
                No results found
              </Text>
            )}
          </Scrollbox>
        </Box>
      )}
    </Box>
  )
}

export default UserSearch
