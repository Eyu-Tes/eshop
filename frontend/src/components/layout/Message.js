import { Alert } from 'react-bootstrap'

const Message = ({ type, children }) => {
    return (
        <Alert 
            variant={type}    
        >
            {children}
        </Alert>
    )
}

Message.defaultProps = {
    type: 'info'
}

export default Message
