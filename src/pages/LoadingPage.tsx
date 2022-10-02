import { Flex, Spinner } from '@chakra-ui/react'

function LoadingPage() {
  return (
    <Flex align="center" justify="center" h="100vh">
      <Spinner
        w="100px"
        h="100px"
        color="yellow.500"
        emptyColor="gray.200"
        speed="0.7s"
        thickness="4px"
      />
    </Flex>
  )
}

export default LoadingPage
