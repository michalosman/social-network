import { Flex } from '@chakra-ui/react'

import Contacts from '../components/Contacts'
import Feed from '../components/Feed'
import Menu from '../components/Menu'
import Navbar from '../components/Navbar'

function HomePage() {
  return (
    <>
      <Navbar />
      <Flex
        justify={{ base: 'center', lg: 'space-between' }}
        maxW="1920px"
        mt="56px"
        mx="auto"
      >
        <Flex
          flex={1}
          display={{ base: 'none', xl: 'flex' }}
          maxW="360px"
          mt={5}
          ml={2}
        >
          <Menu />
        </Flex>
        <Flex flex={2} maxW="744px" mt={4} px={{ base: 4, lg: 8 }}>
          <Feed />
        </Flex>
        <Flex
          flex={1}
          display={{ base: 'none', lg: 'flex' }}
          maxW="360px"
          mt={5}
        >
          <Contacts />
        </Flex>
      </Flex>
    </>
  )
}

export default HomePage
