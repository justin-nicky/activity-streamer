import express, { Request, Response } from 'express'
import { param } from 'express-validator'
import {
  validateRequest,
  protectRoute,
  ForbiddenOperationError,
  BadRequestError,
} from '@geekfindr/common'

import { Message } from '../models/message'
import { Websocket } from '../socket/webSocket'

const router = express.Router()

const requestValidatorMiddlewares = [
  param('messageId').isMongoId().withMessage('Invalid message id.'),
  validateRequest,
]

router.delete(
  '/api/messages/:messageId',
  protectRoute,
  requestValidatorMiddlewares,
  async (req: Request, res: Response) => {
    const { messageId } = req.params

    // Fetching the message
    const message = await Message.findById(messageId)
    if (!message) {
      throw new BadRequestError('Message not found.')
    }

    // Checking permissions
    const isCurrentUserTheAuthor = message.sender.toString() === req.user.id
    if (!isCurrentUserTheAuthor) {
      throw new ForbiddenOperationError()
    }

    // Deleting the message
    await Message.findByIdAndDelete(messageId)

    // Emitting message-deleted event
    Websocket.getInstance().emit('activity', {
      type: 'message:deleted',
      user: req.user,
    })

    res.json({})
  }
)

export { router as deleteMessageRouter }
