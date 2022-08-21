import { Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import useAuth from '../contexts/AuthContext'

interface SignUpFormValues {
  firstName: string
  lastName: string
  email: string
  password: string
}

function SignUpForm() {
  const { register, error, setError } = useAuth()

  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('First name is required')
        .max(30, 'Must be 30 characters or less'),
      lastName: Yup.string()
        .required('Last name is required')
        .max(30, 'Must be 30 characters or less'),
      email: Yup.string()
        .required('Email is required')
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email is invalid'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Must be between 6 and 30 characters')
        .max(30, 'Must be between 6 and 30 characters'),
    }),
    onSubmit: (values) =>
      register(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      ),
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        mb={3}
        isInvalid={
          (formik.errors.firstName && formik.touched.firstName) || undefined
        }
      >
        <Input
          id="firstName"
          name="firstName"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="First name"
          size="lg"
          type="text"
          value={formik.values.firstName}
        />
        <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
      </FormControl>
      <FormControl
        mb={3}
        isInvalid={
          (formik.errors.lastName && formik.touched.lastName) || undefined
        }
      >
        <Input
          id="lastName"
          name="lastName"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="Last name"
          size="lg"
          type="text"
          value={formik.values.lastName}
        />
        <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
      </FormControl>
      <FormControl
        mb={3}
        isInvalid={
          (formik.errors.email && formik.touched.email) ||
          (error && error.code === 409) ||
          undefined
        }
      >
        <Input
          id="email"
          name="email"
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e)
            setError(null)
          }}
          placeholder="Email or phone number"
          size="lg"
          type="text"
          value={formik.values.email}
        />
        <FormErrorMessage>
          {formik.errors.email ||
            (error && error.code === 409 && error.message)}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        mb={3}
        isInvalid={
          (formik.errors.password && formik.touched.password) || undefined
        }
      >
        <Input
          id="password"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="Password"
          size="lg"
          type="password"
          value={formik.values.password}
        />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>
      <Button
        w="100%"
        fontSize="20px"
        fontWeight="bold"
        colorScheme="messenger"
        size="lg"
        type="submit"
      >
        Sign Up
      </Button>
    </form>
  )
}

export default SignUpForm
