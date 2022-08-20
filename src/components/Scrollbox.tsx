import { Flex } from '@chakra-ui/react'
import React from 'react'

interface ScrollboxProps {
  maxH: string
  children: React.ReactNode
}

function Scrollbox({ children, maxH }: ScrollboxProps) {
  return (
    <Flex
      sx={{
        '&:hover': {
          '&::-webkit-scrollbar-thumb': {
            bg: 'gray.300',
          },
        },
        '&::-webkit-scrollbar': {
          w: '2',
        },
        '&::-webkit-scrollbar-track': {
          w: '6',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '10px',
          bg: 'transparent',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          bg: 'gray.400',
        },
      }}
      direction="column"
      overflowY="scroll"
      maxH={maxH}
    >
      {children}
    </Flex>
  )
}

export default Scrollbox
