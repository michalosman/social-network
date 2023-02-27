import { Flex, Spinner, Text } from '@chakra-ui/react'

interface LoadingPageProps {
  message?: string
  description?: string
}

function LoadingPage({ message, description }: LoadingPageProps) {
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
        {message}
      </Text>
      <Text color="gray.500">{description}</Text>
    </Flex>
  )
}

LoadingPage.defaultProps = {
  message: '',
  description: '',
}

export default LoadingPage
