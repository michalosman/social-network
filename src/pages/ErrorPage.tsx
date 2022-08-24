import { Button, Flex, Text } from '@chakra-ui/react'

function ErrorPage() {
  return (
    <Flex align="center" justify="center" direction="column" h="100vh">
      <Text fontSize="20px" fontWeight="bold">
        This Page Isn`t Available
      </Text>
      <Text maxW="452px" mb={4} fontSize="17px" textAlign="center">
        The link may be broken, or the page may have been removed. Check to see
        if the link you`re trying to open is correct.
      </Text>
      <Button colorScheme="messenger" size="lg">
        <a href="/">Go to Home Page</a>
      </Button>
    </Flex>
  )
}

export default ErrorPage
