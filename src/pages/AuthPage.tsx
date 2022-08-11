import { Container, Flex } from '@chakra-ui/react'

import AuthForm from '../components/AuthForm'
import Hero from '../components/Hero'

function AuthPage() {
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
        <Hero />
        <AuthForm />
      </Flex>
    </Container>
  )
}

export default AuthPage
