import { extendTheme } from '@chakra-ui/react'

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
