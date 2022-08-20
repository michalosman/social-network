import { Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

interface LoginFormValues {
  email: string
  password: string
}

function LoginForm() {
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
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

  return (
    <form onSubmit={formik.handleSubmit}>
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
        Log In
      </Button>
    </form>
  )
}

export default LoginForm
