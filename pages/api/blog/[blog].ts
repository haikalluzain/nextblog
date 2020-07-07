import { NextApiRequest, NextApiResponse } from "next";
import { BlogModel, Blog } from "models/Blog";
import formidable from 'formidable'
import path from 'path'
import fs from 'fs'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const form = new formidable.IncomingForm()

  const blog = await BlogModel.findOne({
    _id: req.query.blog,
  })

  if (!blog) {
    res.status(400).json({ message: 'Blog not found!' })
  }

  if (method === 'POST') {
    try {

      form.on('fileBegin', async (name, file) => {
        if (name === 'image') {
          file.path = path.resolve(process.env.UPLOAD_DIR, file.name)
          fs.unlinkSync(`${process.env.UPLOAD_DIR}/${blog.image}`)
        }
      })

      form.parse(req, async (err, fields, files) => {

        if (err) {
          return res.status(400).json(err)
        }

        const { title, description } = fields
        const { image } = files

        if (image) {
          blog.image = image.name
        }

        blog.title = title as string
        blog.description = description as string

        blog.save()
        
      })

      form.on('end', () => {
        res.status(200).json({ message: 'Success!' })
      })

    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false })
    }
  }

  if (method === 'DELETE') {
    fs.unlinkSync(`${process.env.UPLOAD_DIR}/${blog.image}`)
    blog.deleteOne()
    res.status(200).json({ success: true, message: 'Berhasil menghapus blog' })
  }
}


export const config = {
  api: {
    bodyParser: false,
  },
}