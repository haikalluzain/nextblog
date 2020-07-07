import Layout from '@components/Layout'
import { GetServerSideProps } from 'next'
import { BlogModel, Blog } from 'models/Blog'
import { useEffect, useState } from 'react'
import connectDB from 'utils/connectDB'
import { Card, CardImg, CardBody, CardTitle, CardText, Button, Container, Row, Col } from 'reactstrap'
import { useRouter } from 'next/router'
import { Api } from 'utils/Api'

const Index = ({ blog: _blogs }) => {
  const [blogs, setBlogs] = useState(_blogs)
  const { push } = useRouter()


  useEffect(() => {
    setBlogs(_blogs)
  }, [_blogs])

  const onDeleteBlog = async (id) => {
    if (confirm('Ingin menghapus blog?')) {
      const res = await Api().delete(`/blog/${id}`)
      
      if (res.status === 200) push('/')
    }
  }

  return (
    <>
      <Container>
        <h2 className="text-center py-4">List</h2>
        <Row>

          {blogs && blogs.docs.map((item, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="shadow">
                <CardImg top width="100%" style={{ maxHeight: 300 }} src={`${process.env.MEDIA_PATH}/${item.image}`} alt="Card image cap" />
                <CardBody>
                  <CardTitle>{item.title}</CardTitle>
                  <CardText>{item.description}</CardText>
                  <Button onClick={() => 
                    push(
                      `/blog/[blog]`,
                      `/blog/${item._id}`
                      )
                  }>Edit</Button>
                  <Button color="danger" className="ml-2"
                   onClick={() => onDeleteBlog(item._id)}>Delete</Button>
                </CardBody>
              </Card>
            </Col>
          ))}

        </Row>
      </Container>
    </>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async () => {
  try {

    await connectDB()

    const blogs = await BlogModel.find()

    return {
      props: {
        blog: JSON.parse(
          JSON.stringify({
            docs: blogs.map(item => item.toJSON({ virtuals: true })),
          })
        )
      },
    }
  } catch (e) {
    return { props: {} }
  }
}