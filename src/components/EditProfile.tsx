import {
  Button,
  FormControl,
  FormErrorMessage,
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
import { useFormik } from 'formik'
import { MdModeEditOutline } from 'react-icons/md'
import * as Yup from 'yup'

import useAuth from '../contexts/AuthContext'

interface EditProfileFormValues {
  firstName: string
  lastName: string
  image: string
}

function EditProfile() {
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const formik = useFormik<EditProfileFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      image: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(20, 'Must be 20 characters or less'),
      lastName: Yup.string().max(20, 'Must be 20 characters or less'),
    }),
    onSubmit: (values) => console.log(values),
  })

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
          <form onSubmit={formik.handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Profile Picture</FormLabel>
                <Input
                  p={1}
                  id="image"
                  name="image"
                  onChange={formik.handleChange}
                  type="file"
                  value={formik.values.image}
                />
              </FormControl>
              <FormControl
                mt={4}
                isInvalid={
                  (formik.errors.firstName && formik.touched.firstName) ||
                  undefined
                }
              >
                <FormLabel>First name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder={user!.firstName}
                  type="text"
                  value={formik.values.firstName}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl
                mt={4}
                isInvalid={
                  (formik.errors.lastName && formik.touched.lastName) ||
                  undefined
                }
              >
                <FormLabel>Last name</FormLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder={user!.lastName}
                  type="text"
                  value={formik.values.lastName}
                />
                <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button mr={3} colorScheme="messenger" type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditProfile
