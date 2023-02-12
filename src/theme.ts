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
