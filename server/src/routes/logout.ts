import express, { Request, Response } from 'express'

import { Websocket } from '../socket/webSocket'
import { protectRoute } from '@geekfindr/common'

const router = express.Router()

router.post(
  '/api/users/signout',
  protectRoute,
  async (req: Request, res: Response) => {
    res.json({})

    // Emitting logout event
    Websocket.getInstance().emit('activity', {
      type: 'logout',
      user: req.user,
    })
  }
)

export { router as signoutRouter }
