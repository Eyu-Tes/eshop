import { useContext, useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import FormContainer from '../../components/layout/FormContainer'
import CheckoutSteps from '../layout/CheckoutSteps'
import { CartContext } from '../../context/cart/CartContext'

const Payment = ({ history }) => {
    const {shippingInfo, savePaymentMethod} = useContext(CartContext)

    if (!shippingInfo) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitHandler = e => {
        e.preventDefault()
        savePaymentMethod(paymentMethod)
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check 
                            type='radio' 
                            label='PayPal or Credit Card' 
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange = {e => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        {/* <Form.Check 
                            type='radio' 
                            label='Stripe' 
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            onChange = {e => setPaymentMethod(e.target.value)}
                        ></Form.Check> */}
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default Payment
