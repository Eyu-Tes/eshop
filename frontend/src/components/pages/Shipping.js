import { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../../components/layout/FormContainer'
import CheckoutSteps from '../layout/CheckoutSteps'
import { CartContext } from '../../context/cart/CartContext'

const Shipping = ({history}) => {
    const { shippingInfo, saveShippingInfo } = useContext(CartContext)

    const initialValues = {
        address: '', 
        city: '', 
        postalCode: '', 
        country: ''
    }
    const [shippingValues, setShippingValues] = useState(shippingInfo || initialValues)
    const {address, city, postalCode, country} = shippingValues

    const submitHandler = e => {
        e.preventDefault()
        saveShippingInfo(shippingValues)
        history.push('/payment')
    }

    const onChange = e => {
        setShippingValues({...shippingValues, [e.target.name]: e.target.value})
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter address'
                        autoFocus
                        name='address'
                        value={address}
                        onChange={onChange}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter city'
                        name='city'
                        value={city}
                        onChange={onChange}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Postal Code'
                        name='postalCode'
                        value={postalCode}
                        onChange={onChange}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Country'
                        name='country'
                        value={country}
                        onChange={onChange}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default Shipping
