import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest, BadRequestError } from '@geekfindr/common'

import { User } from '../models/user'
import { generateToken } from '../utils/generateToken'
import { Websocket } from '../socket/webSocket'

const router = express.Router()

const requestValidatorMiddlewares = [
  body('email').isEmail().withMessage('Email id is not valid or not provided'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password should be between 4 and 20 characters in length'),
  validateRequest,
]

router.post(
  '/api/users/signup',
  requestValidatorMiddlewares,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    //checking if user with email already exists
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      throw new BadRequestError('Email already taken')
    }

    //creating new user
    const user = User.build({
      email,
      password,
    })
    await user.save()

    //generating auth token
    const token = generateToken({
      id: user.id,
      email: user.email,
    })

    res.json({
      ...user.toJSON(),
      token: token,
    })

    // Emitting login event
    Websocket.getInstance().emit('activity', {
      type: 'login',
      user: user,
    })
  }
)

export { router as signupRouter }
