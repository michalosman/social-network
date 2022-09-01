import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import LoginForm from '../../components/LoginForm'

describe('Login Form', () => {
  describe('given the email and password fields are empty', () => {
    it('should show email and password required errors', async () => {
      render(<LoginForm />)

      const submitBtn = screen.getByRole('button')
      await userEvent.click(submitBtn)

      expect(screen.getByTestId('emailError').textContent).toBe(
        'Email is required'
      )
      expect(screen.getByTestId('passwordError').textContent).toBe(
        'Password is required'
      )
    })
  })

  describe('given the email is invalid', () => {
    it('should show invalid email error', async () => {
      render(<LoginForm />)

      const emailInput = screen.getByPlaceholderText(/email or phone number/i)
      const submitBtn = screen.getByRole('button')

      await userEvent.type(emailInput, 'user')
      await userEvent.click(submitBtn)
      expect(screen.getByTestId('emailError').textContent).toBe(
        'Email is invalid'
      )

      await userEvent.clear(emailInput)
      await userEvent.type(emailInput, 'user@wp')
      await userEvent.click(submitBtn)
      expect(screen.getByTestId('emailError').textContent).toBe(
        'Email is invalid'
      )

      await userEvent.clear(emailInput)
      await userEvent.type(emailInput, 'user@gmail.c')
      await userEvent.click(submitBtn)
      expect(screen.getByTestId('emailError').textContent).toBe(
        'Email is invalid'
      )
    })
  })
})
