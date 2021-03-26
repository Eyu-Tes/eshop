import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, ListGroup, Button, Col, Row } from 'react-bootstrap'
import Message from '../layout/Message'
import Rating from '../products/Rating'
import { UserContext } from '../../context/user/UserContext'
import { ProductContext } from '../../context/product/ProductContext'

const Reviews = ({ prodId }) => {
    const { user } = useContext(UserContext)
    const { product, reviewError, fetchProduct, createProductReview } = useContext(ProductContext)

    const initialReview = {
        rating: 0, 
        comment: ''
    }
    const [review, setReview] = useState(initialReview)
    const {rating, comment} = review

    const submitHandler = e => {
        e.preventDefault()
        createProductReview(prodId, {
            rating, 
            comment
        })
    }

    const onChange = e => {
        setReview({...review, [e.target.name]: e.target.value})
    }

    return (
        <Row>
            <Col md={6}>
                <h2>Reviews</h2>
                { product.reviews.length === 0 && <Message>No reviews</Message> }
                <ListGroup variant='flush'>
                    {product.reviews.map(review => (
                        <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} />
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                        <h2>Write a Customer Review</h2>
                        {reviewError && <Message type='danger'>{reviewError}</Message>}
                        {user ? (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control 
                                        as='select'
                                        name='rating'
                                        value={rating}
                                        onChange={onChange}
                                    >
                                        <option value=''>Select...</option>
                                        <option value='5'>5 - Excellent</option>
                                        <option value='4'>4 - Very Good</option>
                                        <option value='3'>3 - Good</option>
                                        <option value='2'>2 - Fair</option>
                                        <option value='1'>1 - Poor</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='comment'>
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        row='3'
                                        name='comment'
                                        value={comment}
                                        onChange={onChange}
                                    ></Form.Control>
                                </Form.Group>
                                <Button type='submit' variant='primary'>Submit</Button>
                            </Form>
                        ) : (
                            <Message>Please <Link to='/signin'>sign in</Link> to write a review</Message>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    )
}

export default Reviews
