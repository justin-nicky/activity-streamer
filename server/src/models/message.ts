import mongoose from 'mongoose'

// An interface that describes the properties
// that are requried to create a new Message
interface MessageAttrs {
  sender: mongoose.Types.ObjectId
  message: string
}

// An interface that describes the properties
// that a Message Model has
interface MessageModel extends mongoose.Model<MessageDoc> {
  build(attrs: MessageAttrs): MessageDoc
}

// An interface that describes the properties
// that a Message Document has
export interface MessageDoc extends mongoose.Document {
  sender: mongoose.Types.ObjectId
  message: string
}

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v
        ret.id = ret._id
        delete ret._id
      },
    },
    timestamps: true,
  }
)

messageSchema.statics.build = (attrs: MessageAttrs) => {
  return new Message(attrs)
}
const Message = mongoose.model<MessageDoc, MessageModel>(
  'Message',
  messageSchema
)

export { Message }
