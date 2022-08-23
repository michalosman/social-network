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

import useUser from '../hooks/useUser'

interface EditProfileFormValues {
  firstName: string
  lastName: string
  email: string
  password: string
  image: string
}

function EditProfile() {
  const { user, updateUser: update } = useUser()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const formik = useFormik<EditProfileFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      image: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(30, 'Must be 30 characters or less'),
      lastName: Yup.string().max(30, 'Must be 30 characters or less'),
      email: Yup.string().matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        'Email is invalid'
      ),
      password: Yup.string()
        .min(6, 'Must be between 6 and 30 characters')
        .max(30, 'Must be between 6 and 30 characters'),
    }),
    onSubmit: (values) => {
      let key: keyof EditProfileFormValues
      const updatedFields: EditProfileFormValues = {} as EditProfileFormValues

      for (key in values) {
        if (values[key] !== '') {
          updatedFields[key] = values[key]
        }
      }

      update(updatedFields)
      formik.resetForm()
      onClose()
    },
  })

  return (
    <div>
      <Button
        leftIcon={<MdModeEditOutline fontSize="20px" />}
        onClick={onOpen}
        variant="gray"
      >
        Edit profile
      </Button>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={() => {
          formik.resetForm()
          onClose()
        }}
        preserveScrollBarGap
      >
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
                  placeholder={user.firstName}
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
                  placeholder={user.lastName}
                  type="text"
                  value={formik.values.lastName}
                />
                <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
              </FormControl>
              <FormControl
                mt={4}
                isInvalid={
                  (formik.errors.email && formik.touched.email) || undefined
                }
              >
                <FormLabel>Email</FormLabel>
                <Input
                  id="email"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder={user.email}
                  type="text"
                  value={formik.values.email}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                mt={4}
                isInvalid={
                  (formik.errors.password && formik.touched.password) ||
                  undefined
                }
              >
                <FormLabel>Password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="*********"
                  type="password"
                  value={formik.values.password}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button mr={3} colorScheme="messenger" type="submit">
                Save
              </Button>
              <Button
                onClick={() => {
                  formik.resetForm()
                  onClose()
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default EditProfile
