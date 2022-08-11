import { Container, Flex } from '@chakra-ui/react'

import Contacts from '../components/Contacts'
import Feed from '../components/Feed'
import Menu from '../components/Menu'
import Navbar from '../components/Navbar'
import PostForm from '../components/PostForm'

function HomePage() {
  return (
    <>
      <Navbar />
      <Flex>
        <Menu />
        <Container maxW="622px" p={4}>
          <PostForm />
          <Feed />
        </Container>
        <Contacts />
      </Flex>
    </>
  )
}

export default HomePage
