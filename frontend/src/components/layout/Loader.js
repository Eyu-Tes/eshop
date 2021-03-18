import { Spinner } from 'react-bootstrap'

const Loader = () => (
    <Spinner 
        animation='border' 
        role='status'
        style={{ width: '100px', height: '100px', margin: '2.5rem auto', display: 'block' }}
    >
        <span className='sr-only'>Loading...</span>
    </Spinner>
)

export default Loader
