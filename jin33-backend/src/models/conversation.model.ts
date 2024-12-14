import { Schema, model, Types } from 'mongoose';

export interface IMessage {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  tokens?: number;
}

export interface IConversation {
  userId: Types.ObjectId;
  modelId: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
  content: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  tokens: {
    type: Number,
    required: false,
  },
});

const conversationSchema = new Schema<IConversation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    modelId: {
      type: String,
      required: true,
    },
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

// 添加索引
conversationSchema.index({ userId: 1, createdAt: -1 });
conversationSchema.index({ modelId: 1 });

export const Conversation = model<IConversation>('Conversation', conversationSchema);
