import mongoose from 'mongoose'

export default async  () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.models = {}
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose
  }

  const mongoDBConn = `mongodb://localhost/blog-app`

  await mongoose.connect(process.env.MONGODB_PRODUCTION_URL || mongoDBConn, {
    connectTimeoutMS: 15000,
    useNewUrlParser: true,
    autoIndex: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })

  console.log('Connecting to db')
}
