import { Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import useAuth from '../hooks/useAuth'

interface LoginFormValues {
  email: string
  password: string
}

function LoginForm() {
  const { login, error } = useAuth()

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Email is invalid'
        )
        .required('Email is required'),
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
          (error && (error.code === 404 || error.code === 400)) ||
          undefined
        }
      >
        <Input
          id="email"
          name="email"
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e)
            if (error) error.code = 0
          }}
          placeholder="Email or phone number"
          size="lg"
          type="text"
          value={formik.values.email}
        />
        <FormErrorMessage data-testid="emailError">
          {formik.errors.email ||
            (error &&
              (error.code === 404 || error.code === 400) &&
              error.message)}
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
            if (error) error.code = 0
          }}
          placeholder="Password"
          size="lg"
          type="password"
          value={formik.values.password}
        />
        <FormErrorMessage data-testid="passwordError">
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
