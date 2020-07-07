import React, { useState } from 'react'
import { Col, FormGroup, Label, Card, Container, Row } from 'reactstrap';
import { Formik, Form, useFormikContext, } from 'formik'
import { Input, Submit } from 'formstrap'
import * as Yup from 'yup'
import { Api } from 'utils/Api';
import { Blog } from 'models/Blog';
import { useRouter } from 'next/dist/client/router';

const NewBlog = () => {
	
	const [image, setImage] = useState('')
	const router = useRouter()

	const iniitalValue = {
		title: '',
		description: '',
		image: []
	}

	const validation = Yup.object().shape({
		title: Yup.string()
			.min(3, 'Title is too short!')
			.max(50, 'Title is too long!')
			.required('Please input any title'),
		description: Yup.string()
			.min(3, 'Description is too short!')
			.required('Please input description'),
	})

	const onChangeImage = (e) => {
		const file = e.currentTarget.files[0]
		setImage(file)
	}

	const onSave = async values => {
		try {
			let form = new FormData()
			form.set('title', values.title)
			form.set('description', values.description)
			form.append('image', image)

			const res = await Api().post('/blog', form)

			if (res.status === 200) {
				router.push('/')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Container className="mt-5">
			<Row>
				<Col xs={10} className="mx-auto">
					<Card body>
						<Formik
							initialValues={iniitalValue}
							onSubmit={onSave}
							validationSchema={validation}>
							<Form encType="multipart/form-data">
								<FormGroup row>
									<Label for="title" sm={2}>Title</Label>
									<Col sm={10}>
										<Input type="text" name="title" id="title" placeholder="Input a title" />
									</Col>
								</FormGroup>

								<FormGroup row>
									<Label for="desc" sm={2}>Description</Label>
									<Col sm={10}>
										<Input type="textarea" name="description" id="desc" />
									</Col>
								</FormGroup>

								<FormGroup row>
									<Label for="img" sm={2}>Gambar</Label>
									<Col sm={10}>
										<input type="file" name="image" accept=".jpg,.jpeg,.png" id="img" onChange={(e) => onChangeImage(e)} />
									</Col>
								</FormGroup>

								<FormGroup check row>
									<Col xs={{ size: 10, offset: 2 }} className="pl-0">
										<Submit color="primary" withSpinner>Submit</Submit>
									</Col>
								</FormGroup>
							</Form>
						</Formik>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default NewBlog