import mongoose, { Document, Schema, Model, model } from 'mongoose'

export interface Blog {
  title: string
  description: string
  image: string
}

export const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true
    }
  },
  { timestamps: {} }
)

export interface BlogDocument extends Blog, Document {}

export const BlogModel: Model<BlogDocument> = mongoose.models.Blog || model<BlogDocument>('Blog', BlogSchema)