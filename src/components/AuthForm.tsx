import { Button, Divider, Flex, Input, Link } from '@chakra-ui/react'
import { useState } from 'react'

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Flex
      align="center"
      direction="column"
      gap={3}
      w="100%"
      maxW="400px"
      m={{ base: 'auto', lg: 0 }}
      mt={{ base: 10, lg: -2 }}
      p={4}
      bg="white"
      borderRadius="lg"
      shadow="xl"
    >
      {!isLogin && (
        <>
          <Input placeholder="First name" size="lg" />
          <Input placeholder="Last name" size="lg" />
        </>
      )}
      <Input
        autoFocus
        placeholder="Email or phone number"
        size="lg"
        type="email"
      />
      <Input placeholder="Password" size="lg" type="password" />
      <Button
        w="100%"
        fontSize="20px"
        fontWeight="bold"
        colorScheme="messenger"
        size="lg"
      >
        {isLogin ? 'Log In' : 'Sign Up'}
      </Button>
      <Link color="#1877F2" fontSize="14px" href="/">
        Forgot password?
      </Link>
      <Divider mt={2} mb={4} />
      <Button
        mb={3}
        colorScheme="whatsapp"
        onClick={() => setIsLogin(!isLogin)}
        size="lg"
      >
        {isLogin ? 'Create new account' : 'Log in with your account'}
      </Button>
    </Flex>
  )
}

export default AuthForm
