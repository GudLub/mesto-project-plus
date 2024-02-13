import { Schema, model} from "mongoose";

interface IUser {
  name: string,
  about: string,
  avatar: string
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Поле name обязательно'],
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов']
  },
  about: {
    type: String,
    required: [true, 'Поле about обязательно'],
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [200, 'Максимальная длина 200 символов']
  },
  avatar: {
    type: String,
    required: [true, 'Поле avatar обязательно'],
  }
},
{ versionKey: false },
)

export default model<IUser>('user', UserSchema);