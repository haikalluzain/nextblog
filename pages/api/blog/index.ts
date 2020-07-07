import { NextApiRequest, NextApiResponse } from "next"
import { BlogModel, Blog } from 'models/Blog'
import connectDB from "utils/connectDB"
import path, { join } from 'path'
import { promises as fs } from 'fs'
import formidable from 'formidable'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const form = new formidable.IncomingForm()

  await connectDB()

  switch (method) {
    case 'GET':
      try {
        const blogs = await BlogModel.find() /* find all the data in our database */
        res.status(200).json({ success: true, data: blogs })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {

        form.parse(req, async (err, fields, files) => {

          if (err) {
            return res.status(400).json(err)
          }

          const { title, description } = fields
          const { image } = files

          await BlogModel.create({
            title,
            description,
            image: image.name
          } as Blog)
          
        })

        form.on('fileBegin', async (name, file) => {
          if (name === 'image') {
            file.path = path.resolve(process.env.UPLOAD_DIR, file.name)
          }
          
        })

        form.on('end', () => {
          res.status(200).json({ message: 'Success!' })
        })
        

      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}