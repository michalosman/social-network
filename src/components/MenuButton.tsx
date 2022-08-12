import { Button } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

function MenuButton({ children }: Props) {
  return (
    <Button
      justifyContent="flex-start"
      w="100%"
      px={2}
      py={1}
      textAlign="left"
      size="lg"
    >
      {children}
    </Button>
  )
}

export default MenuButton
