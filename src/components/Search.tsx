import { Box, Button, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { users } from '../utils/data.json'
import Avatar from './Avatar'
import Scrollbox from './Scrollbox'

type Props = {
  phrase: string
}

function Search({ phrase }: Props) {
  const [results, setResults] = useState(users)

  useEffect(() => {
    const regex = new RegExp(phrase, 'gi')
    setResults(
      users.filter((user) => `${user.firstName} ${user.lastName}`.match(regex))
    )
  }, [phrase])

  return (
    <Box
      pos="absolute"
      top="45px"
      left="-240px"
      w="240px"
      p={2}
      bg="white"
      borderRadius="md"
      shadow="lg"
    >
      <Scrollbox maxH="176px">
        {results.map((user) => (
          <Button
            justifyContent="flex-start"
            w="100%"
            px={2}
            py={1}
            textAlign="left"
            size="lg"
            variant="ghost"
          >
            <Avatar size="36px" src={user.image} />
            <Text
              ml={2}
              fontSize="15px"
            >{`${user.firstName} ${user.lastName}`}</Text>
          </Button>
        ))}
        {!results.length && (
          <Text align="center" color="gray.500">
            No results found
          </Text>
        )}
      </Scrollbox>
    </Box>
  )
}

export default Search
