import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import * as usersAPI from '../api/users'
import Avatar from './Avatar'
import Scrollbox from './Scrollbox'

function UserSearch() {
  const [searchedUser, setSearchedUser] = useState<string>('')
  const [results, setResults] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    updateResults()
  }, [searchedUser])

  const updateResults = async () => {
    setLoading(true)
    const words = searchedUser.trim().split(' ')
    if (words[0] === '') return

    const results = await usersAPI.getSearched(words[0], words[1], 10)
    setResults(results)

    if (results.length === 0) {
      const lastNameResults = await usersAPI.getSearched(words[1], words[0], 10)
      setResults(lastNameResults)
    }

    setTimeout(() => setLoading(false), 300)
  }

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
      {searchedUser.trim() && (
        <Box
          pos="absolute"
          w="240px"
          p={2}
          bg="white"
          borderRadius="md"
          shadow="lg"
        >
          {loading ? (
            <Flex align="center" justify="center" h="192px">
              <Spinner
                w="75px"
                h="75px"
                color="messenger.500"
                emptyColor="gray.200"
                speed="0.7s"
                thickness="3px"
              />
            </Flex>
          ) : (
            <Scrollbox maxH="192px">
              {results.map((user) => (
                <Link to={`/profile/${user.id}`} key={user.id}>
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
                <Text align="center" py={3} color="gray.500">
                  No results found
                </Text>
              )}
            </Scrollbox>
          )}
        </Box>
      )}
    </Box>
  )
}

export default UserSearch
