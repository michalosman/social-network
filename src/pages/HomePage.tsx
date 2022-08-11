import { Container } from '@chakra-ui/react'

import Feed from '../components/Feed'
import Navbar from '../components/Navbar'
import PostForm from '../components/PostForm'

function HomePage() {
  return (
    <>
      <Navbar />
      <Container maxW="532px" p={4}>
        <PostForm />
        <Feed />
      </Container>
    </>
  )
}

export default HomePage
