import mongoose from 'mongoose'

import { Password } from '../utils/password'

// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
  email: string
  password: string
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

// An interface that describes the properties
// that a User Document has
export interface UserDoc extends mongoose.Document {
  email: string
  password: string
  //messages: mongoose.Types.ObjectId[]
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    // messages: {
    //   type: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
    //   default: [],
    // },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v
        delete ret.password
        ret.id = ret._id
        delete ret._id
      },
    },
    timestamps: true,
  }
)

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await Password.hashPassword(this.password)
  }
  next()
})

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
