import { Schema, ObjectId, model } from "mongoose";

interface ICard {
  name: string,
  link: string,
  owner: ObjectId,
  likes: ObjectId[],
  createdAt: Date
}

const CardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: [true, 'Поле name обязательно'],
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов']
  },
  link: {
    type: String,
    required: [true, 'Поле link обязательно'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: [true, 'Поле owner обязательно'],
    ref: 'user',
  },
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
},
{ versionKey: false },
)

export default model<ICard>('card', CardSchema);