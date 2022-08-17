import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { MdModeEditOutline } from 'react-icons/md'

function Settings() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        leftIcon={<MdModeEditOutline fontSize="20px" />}
        onClick={onOpen}
        variant="gray"
      >
        Edit profile
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit profile</ModalHeader>
          <ModalCloseButton rounded="full" />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Profile Picture</FormLabel>
              <Input p={1} type="file" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>First name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} colorScheme="messenger" onClick={onClose}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Settings
