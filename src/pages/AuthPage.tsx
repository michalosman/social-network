import {
  Button,
  Container,
  Divider,
  Flex,
  Image,
  Input,
  Link,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

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
          mt={{ base: 0, lg: '24px' }}
        >
          <Image
            w="301px"
            mt={3}
            mb={-2}
            ml={{ base: 0, lg: '-28px' }}
            alt="Facebook logo"
            src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
          />
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
      </Flex>
    </Container>
  )
}

export default AuthPage
