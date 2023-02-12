import { Box, Flex, Image } from '@chakra-ui/react'

import logo from '../assets/logo.png'
import NavMenu from './NavMenu'
import NavSearch from './NavSearch'

function NavBar() {
  return (
    <Box
      as="nav"
      pos="fixed"
      zIndex={100}
      top={0}
      w="100%"
      bg="white"
      shadow="base"
    >
      <Flex
        justify="space-between"
        gap={2}
        maxW="1920px"
        m="auto"
        px={4}
        py={2}
      >
        <Flex gap={2}>
          <a href="/">
            <Image w="40px" alt="Social network logo" src={logo} />
          </a>
          <NavSearch />
        </Flex>
        <NavMenu />
      </Flex>
    </Box>
  )
}

export default NavBar
