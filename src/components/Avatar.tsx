import { Avatar as ChakraAvatar } from '@chakra-ui/react'

type Props = {
  src: string
  size?: '28px' | '32px' | '40px' | '168px'
}

function Avatar({ src, size }: Props) {
  return (
    <ChakraAvatar
      sx={{ cursor: 'pointer' }}
      w={size}
      h={size}
      bg="gray.300"
      _hover={{ filter: 'brightness(0.96)' }}
      src={src}
    />
  )
}

Avatar.defaultProps = {
  size: '40px',
}

export default Avatar
