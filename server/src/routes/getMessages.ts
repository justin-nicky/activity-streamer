import express, { Request, Response } from 'express'
import { protectRoute } from '@geekfindr/common'
import mongoose from 'mongoose'

import { Message } from '../models/message'

const router = express.Router()

router.post(
  '/api/messages',
  protectRoute,
  async (req: Request, res: Response) => {
    // Fetching all the messages
    const messages = await Message.find().sort({ createdAt: -1 }).limit(50)

    res.json(messages)
  }
)

export { router as getMessagesRouter }
