import { Button, Container, Divider, Flex, Link, Text } from '@chakra-ui/react'
import { useState } from 'react'

import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import useAuth from '../hooks/useAuth'

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const { login } = useAuth()

  return (
    <Container
      as="main"
      sx={{ fontFamily: 'SFProDisplay-Regular, Helvetica, Arial, sans-serif' }}
      maxW="1012px"
    >
      <Flex
        justify={{ base: 'flex-start', lg: 'space-between' }}
        direction={{ base: 'column', lg: 'row' }}
        mt={{ base: 0, lg: '140px' }}
      >
        <Flex
          align={{ base: 'center', lg: 'flex-start' }}
          direction="column"
          mt={{ base: 0, lg: '36px' }}
        >
          <Text
            align={{ base: 'center', lg: 'left' }}
            mt={{ base: '30px', lg: '8px' }}
            mb={{ base: '12px', lg: 0 }}
            color="messenger.500"
            fontFamily="-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif"
            fontSize={{ base: '52px', lg: '60px' }}
            fontWeight="bold"
            letterSpacing="-3px"
          >
            facebook clone
          </Text>
          <Text
            align={{ base: 'center', lg: 'left' }}
            maxW={{ base: '400px', lg: '500px' }}
            fontSize={{ base: '24px', lg: '28px' }}
            lineHeight="1.14"
          >
            Connect with friends and the world around you on Facebook.
          </Text>
        </Flex>
        <Flex
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
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <Link
            color="messenger.500"
            fontSize="14px"
            textAlign="center"
            href="/"
          >
            Forgot password?
          </Link>
          <Divider mt={2} mb={4} />
          <Flex justify="center">
            <Button
              mb={3}
              colorScheme="whatsapp"
              onClick={() => setIsLogin(!isLogin)}
              size="lg"
            >
              {isLogin ? 'Create new account' : 'Log in with your account'}
            </Button>
          </Flex>
          <Flex justify="center">
            <Button
              mb={3}
              colorScheme="messenger"
              onClick={() =>
                login({ email: 'test@gmail.com', password: 'test123' })
              }
              size="lg"
            >
              Log in with test user
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}

export default AuthPage
