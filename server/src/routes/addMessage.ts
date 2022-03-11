import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest, protectRoute } from '@geekfindr/common'
import mongoose from 'mongoose'

import { Message } from '../models/message'

const router = express.Router()

const requestValidatorMiddlewares = [
  body('message').trim().notEmpty().withMessage('Message is required.'),
  validateRequest,
]

router.post(
  '/api/messages',
  protectRoute,
  requestValidatorMiddlewares,
  async (req: Request, res: Response) => {
    const { message: messageText } = req.body

    // Creating a new message
    await Message.build({
      senderId: new mongoose.Types.ObjectId(req.user.id),
      message: messageText,
    }).save()

    res.json({})
  }
)

export { router as addMessageRouter }
