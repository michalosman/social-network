import { Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

interface FormFields {
  firstName: string
  lastName: string
  email: string
  password: string
}

function SignUpForm() {
  const formik = useFormik<FormFields>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('First name is required')
        .max(20, 'Must be 20 characters or less'),
      lastName: Yup.string()
        .required('Last name is required')
        .max(20, 'Must be 20 characters or less'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Must be between 6 and 20 characters')
        .max(20, 'Must be between 6 and 20 characters'),
    }),
    onSubmit: (values) => console.log(values),
  })

  console.log(formik.errors)

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
        isInvalid={(formik.errors.email && formik.touched.email) || undefined}
      >
        <Input
          id="email"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="Email or phone number"
          size="lg"
          type="email"
          value={formik.values.email}
        />
        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
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
