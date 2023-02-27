import { Flex, Spinner, Text } from '@chakra-ui/react'

function LoadingPage() {
  return (
    <Flex align="center" justify="center" direction="column" h="100vh">
      <Spinner
        w="100px"
        h="100px"
        color="messenger.500"
        emptyColor="gray.200"
        speed="0.7s"
        thickness="4px"
      />
      <Text mt={4} fontSize="2xl">
        Waking up the server...{' '}
      </Text>
      <Text color="gray.500">Be patient, it may take up to 2 minutes</Text>
    </Flex>
  )
}

export default LoadingPage
