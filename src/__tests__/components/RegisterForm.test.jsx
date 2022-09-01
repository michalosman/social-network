import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import RegisterForm from '../../components/RegisterForm'

describe('Register Form', () => {
  describe('given the required fields are empty', () => {
    it('should show required errors', async () => {
      render(<RegisterForm />)

      const submitBtn = screen.getByRole('button')
      await userEvent.click(submitBtn)

      expect(screen.getByTestId('firstNameError').textContent).toBe(
        'First name is required'
      )
      expect(screen.getByTestId('lastNameError').textContent).toBe(
        'Last name is required'
      )
      expect(screen.getByTestId('emailError').textContent).toBe(
        'Email is required'
      )
      expect(screen.getByTestId('passwordError').textContent).toBe(
        'Password is required'
      )
    })
  })

  describe('given the first name is too long', () => {
    it('should show first name too long error', async () => {
      render(<RegisterForm />)

      const submitBtn = screen.getByRole('button')
      const firstNameInput = screen.getByPlaceholderText(/first name/i)
      await userEvent.type(firstNameInput, '123'.repeat(11))
      await userEvent.click(submitBtn)

      expect(screen.getByTestId('firstNameError').textContent).toBe(
        'Must be 30 characters or less'
      )
    })
  })

  describe('given the last name is too long', () => {
    it('should show last name too long error', async () => {
      render(<RegisterForm />)

      const submitBtn = screen.getByRole('button')
      const lastNameInput = screen.getByPlaceholderText(/last name/i)
      await userEvent.type(lastNameInput, '123'.repeat(11))
      await userEvent.click(submitBtn)

      expect(screen.getByTestId('lastNameError').textContent).toBe(
        'Must be 30 characters or less'
      )
    })
  })

  describe('given the email is invalid', () => {
    it('should show invalid email error', async () => {
      render(<RegisterForm />)

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

  describe('given the password is too short', () => {
    it('should show password length error', async () => {
      render(<RegisterForm />)

      const passwordInput = screen.getByPlaceholderText(/password/i)
      const submitBtn = screen.getByRole('button')

      await userEvent.type(passwordInput, '123')
      await userEvent.click(submitBtn)
      expect(screen.getByTestId('passwordError').textContent).toBe(
        'Must be between 6 and 30 characters'
      )
    })
  })

  describe('given the password is too long', () => {
    it('should show password length error', async () => {
      render(<RegisterForm />)

      const passwordInput = screen.getByPlaceholderText(/password/i)
      const submitBtn = screen.getByRole('button')

      await userEvent.type(passwordInput, '123'.repeat(11))
      await userEvent.click(submitBtn)
      expect(screen.getByTestId('passwordError').textContent).toBe(
        'Must be between 6 and 30 characters'
      )
    })
  })
})
