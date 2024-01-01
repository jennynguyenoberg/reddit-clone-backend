import { Document, Schema, model } from "mongoose"

interface IUser extends Document {
  userName: string
  password: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const User = model<IUser>('User', UserSchema)

export default User