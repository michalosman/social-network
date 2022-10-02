import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

function Loading() {
  return (
    <Flex align="center" justify="center" w="100%" h="100%">
      <Spinner
        w="50px"
        h="50px"
        color="yellow.500"
        emptyColor="gray.200"
        speed="0.7s"
        thickness="2px"
      />
    </Flex>
  )
}

export default Loading
