import express, { urlencoded, json } from 'express'
import 'express-async-errors'
import cors from 'cors'
import morgan from 'morgan'
import http from 'http'
import { NotFoundError, errorHandler } from '@geekfindr/common'
import dotenv from 'dotenv'

import { connectDB } from './config/db'
import { signupRouter } from './routes/signup'
import { signinRouter } from './routes/signin'
import { addMessageRouter } from './routes/addMessage'
import { updateMessageRouter } from './routes/updateMessage'
import { deleteMessageRouter } from './routes/deleteMessage'
import { getMessagesRouter } from './routes/getMessages'
import { Websocket } from './socket/webSocket'
// import { getCurrentUser, userJoin, userLeave } from './socket/users'
// import { Conversation } from './models/conversation'
// import { Message } from './models/message'

const app = express()
const httpServer = http.createServer(app)
dotenv.config()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('tiny'))

// const io = new Server(httpServer, {
//   path: '/api/socket.io',
//   cors: {
//     origin: '*',
//     methods: 'GET',
//   },
//   allowEIO3: true,
// })

const io = Websocket.getInstance(httpServer)

// Socket connection
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`)
  })
})

// REST API Routes
app.get('/', (req, res) => {
  res.send('Hello World !!!!!')
})

app.use(signupRouter)
app.use(signinRouter)
app.use(addMessageRouter)
app.use(updateMessageRouter)
app.use(deleteMessageRouter)
app.use(getMessagesRouter)

app.all('*', () => {
  throw new NotFoundError()
})
app.use(errorHandler)

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URL must be defined')
  }
  if (!process.env.JWT_SECRET) {
    throw new Error('MONGO_URL must be defined')
  }

  connectDB()

  httpServer.listen(5000, () => {
    console.log('Chat service listening on port 5000...')
  })
}
start()
