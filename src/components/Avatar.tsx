import { Avatar as ChakraAvatar } from '@chakra-ui/react'

interface AvatarProps {
  src: string
  hover?: boolean
  size?: '28px' | '32px' | '36px' | '40px' | '60px' | '176px'
  border?: string
}

function Avatar({ src, hover, size, border }: AvatarProps) {
  return (
    <ChakraAvatar
      w={size}
      h={size}
      bg="gray.300"
      border={border}
      _hover={hover ? { filter: 'brightness(0.96)', cursor: 'pointer' } : {}}
      src={src}
    />
  )
}

Avatar.defaultProps = {
  size: '40px',
  hover: false,
  border: 'none',
}

export default Avatar
