import { extendTheme } from '@chakra-ui/react'
import defaultTheme from '@chakra-ui/theme'

const theme = extendTheme({
  components: {
    Input: {
      variants: {
        round: {
          field: {
            bg: 'gray.100',
            borderRadius: 'full',
            border: '1px solid transparent',
            _focus: {
              border: '1px solid #ccc',
            },
          },
        },
      },
    },
    Button: {
      variants: {
        left: (props: any) => ({
          ...defaultTheme.components.Button.variants.solid(props),
          justifyContent: 'flex-start',
          px: 2,
        }),
        gray: (props: any) => ({
          ...defaultTheme.components.Button.variants.solid(props),
          backgroundColor: 'gray.200',
          _hover: {
            backgroundColor: 'gray.300',
          },
          _active: {
            backgroundColor: 'gray.400',
          },
        }),
        primary: (props: any) => ({
          ...defaultTheme.components.Button.variants.solid(props),
          color: 'white',
          backgroundColor: 'yellow.500',
          _hover: {
            backgroundColor: 'yellow.600',
          },
          _active: {
            transform: 'scale(0.98)',
          },
        }),
        secondary: (props: any) => ({
          ...defaultTheme.components.Button.variants.solid(props),
          color: 'white',
          backgroundColor: '#0F7676',
          _hover: {
            backgroundColor: '#0E6565',
          },
          _active: {
            transform: 'scale(0.98)',
          },
        }),
      },
    },
  },
  styles: {
    global: {
      html: {
        overflowY: 'scroll',
      },
      body: {
        bg: 'gray.100',
      },
    },
  },
})

export default theme
