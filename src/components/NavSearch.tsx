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
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import useSearch from '../hooks/useSearch'
import Avatar from './Avatar'
import Loading from './Loading'
import Scrollbox from './Scrollbox'

function NavSearch() {
  const [searchPhrase, setSearchPhrase] = useState<string>('')
  const { searchResults, searchResultsInfo } = useSearch(searchPhrase)

  return (
    <Box pos="relative">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={BsSearch} color="gray.600" />
        </InputLeftElement>
        <Input
          maxW="240px"
          onBlur={() => setTimeout(() => setSearchPhrase(''), 100)}
          onChange={(e) => setSearchPhrase(e.target.value)}
          placeholder="Search"
          type="text"
          value={searchPhrase}
          variant="round"
        />
      </InputGroup>
      {searchPhrase.trim() && (
        <Box
          pos="absolute"
          w="240px"
          p={2}
          bg="white"
          borderRadius="md"
          shadow="lg"
        >
          {searchResultsInfo.isLoading ? (
            <Flex align="center" justify="center" h="192px">
              <Loading />
            </Flex>
          ) : (
            <Scrollbox maxH="192px">
              {searchResults.map((user) => (
                <Link key={user.id} to={`/profile/${user.id}`}>
                  <Button
                    justifyContent="flex-start"
                    w="100%"
                    px={2}
                    py={1}
                    textAlign="left"
                    onClick={() => setSearchPhrase('')}
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
              {searchResults.length === 0 && (
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
