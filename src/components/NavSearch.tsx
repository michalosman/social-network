import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import * as usersAPI from '../api/usersAPI'
import Avatar from './Avatar'
import Loading from './Loading'
import Scrollbox from './Scrollbox'

function NavSearch() {
  const [searchedUser, setSearchedUser] = useState<string>('')
  const [results, setResults] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    updateResults()
  }, [searchedUser])

  const updateResults = async () => {
    setIsLoading(true)
    const [firstName, lastName] = searchedUser.trim().split(' ')
    const results = await usersAPI.getSearched(firstName, lastName, 10)
    setResults(results)
    setTimeout(() => setIsLoading(false), 500)
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
          {isLoading ? (
            <Flex align="center" justify="center" h="192px">
              <Loading />
            </Flex>
          ) : (
            <Scrollbox maxH="192px">
              {results.map((user) => (
                <Link key={user.id} to={`/profile/${user.id}`}>
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

export default NavSearch
