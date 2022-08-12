import { Avatar as ChakraAvatar } from '@chakra-ui/react'

type Props = {
  src: string
  hover?: boolean
  size?: '28px' | '32px' | '36px' | '40px' | '60px' | '168px'
}

function Avatar({ src, hover, size }: Props) {
  return (
    <ChakraAvatar
      w={size}
      h={size}
      bg="gray.300"
      _hover={hover ? { filter: 'brightness(0.96)', cursor: 'pointer' } : {}}
      src={src}
    />
  )
}

Avatar.defaultProps = {
  size: '40px',
  hover: false,
}

export default Avatar
