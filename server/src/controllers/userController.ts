/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from '../models/User'
import ApiError from '../error/ApiError'
import 'express-async-errors'

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY || ''

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find()

  const usersData = users.map((user) => {
    const { password, warnings, isBlocked, role, ...userData } = user
    return userData
  })

  res.status(200).json(usersData)
}

export const verifyUser = (req: Request, res: Response) => {
  res.status(200).json({ isValid: req.body.role === req.user.role })
}

export const signUp = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body

  if (!email || !password || !firstName || !lastName)
    throw ApiError.badRequest('Request data incomplete')

  const doesExist = Boolean(await User.findOne({ email }))
  if (doesExist) throw ApiError.badRequest('Account already exists')

  const hashedPassword = await bcrypt.hash(password, 12)

  const newUser = new User()
  newUser.email = email
  newUser.password = hashedPassword
  newUser.firstName = firstName
  newUser.lastName = lastName
  await newUser.save()

  const token = jwt.sign({ id: newUser.id }, SECRET_KEY, {
    expiresIn: '7d',
  })
  const { password: remove, ...userData } = newUser

  res.status(200).json({ ...userData, token })
}

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) throw ApiError.badRequest('Request data incomplete')

  const user = await User.findOne({ email })
  if (!user) throw ApiError.notFound('User not found')

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) throw ApiError.badRequest('Wrong password')

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '7d' })
  const { password: remove, ...userData } = user

  res.status(200).json({ ...userData, token })
}

export const warnUser = async (req: Request, res: Response) => {
  const { userId } = req.params

  if (!userId) throw ApiError.badRequest('Request data incomplete')
  if (!parseInt(userId)) throw ApiError.badRequest('Invalid user id')

  const user = await User.findOne(userId)
  if (!user) throw ApiError.notFound('User not found')

  user.warnings += 1
  await user.save()

  res.status(200).json({
    name: `${user.firstName} ${user.lastName}`,
    warnings: user.warnings,
  })
}

export const blockUser = async (req: Request, res: Response) => {
  const { userId } = req.params

  if (!userId) throw ApiError.badRequest('Request data incomplete')
  if (!parseInt(userId)) throw ApiError.badRequest('Invalid user id')

  const user = await User.findOne(userId)
  if (!user) throw ApiError.notFound('User not found')

  user.isBlocked = true
  await user.save()

  res.status(200).json({
    name: `${user.firstName} ${user.lastName}`,
    isBlocked: user.isBlocked,
  })
}

export const unblockUser = async (req: Request, res: Response) => {
  const { userId } = req.params

  if (!userId) throw ApiError.badRequest('Request data incomplete')
  if (!parseInt(userId)) throw ApiError.badRequest('Invalid user id')

  const user = await User.findOne(userId)
  if (!user) throw ApiError.notFound('User not found')

  user.isBlocked = false
  await user.save()

  res.status(200).json({
    name: `${user.firstName} ${user.lastName}`,
    isBlocked: user.isBlocked,
  })
}
