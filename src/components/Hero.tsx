import { Flex, Image, Text } from '@chakra-ui/react'

function Hero() {
  return (
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
  )
}

export default Hero
