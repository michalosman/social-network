import { Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import useAuth from '../contexts/AuthContext'

interface LoginFormValues {
  email: string
  password: string
}

function LoginForm() {
  const { login, error, setError } = useAuth()

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email is invalid'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => login(values),
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        mb={3}
        isInvalid={
          (formik.errors.email && formik.touched.email) ||
          (error && error.code === 404) ||
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
            (error && error.code === 404 && error.message)}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        mb={3}
        isInvalid={
          (formik.errors.password && formik.touched.password) ||
          (error && error.code === 401) ||
          undefined
        }
      >
        <Input
          id="password"
          name="password"
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e)
            setError(null)
          }}
          placeholder="Password"
          size="lg"
          type="password"
          value={formik.values.password}
        />
        <FormErrorMessage>
          {formik.errors.password ||
            (error && error.code === 401 && error.message)}
        </FormErrorMessage>
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
