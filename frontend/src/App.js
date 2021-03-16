import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/pages/Home'
import Product from './components/pages/Product'

const App = () => {
  return (
    <Router>
        <Header/>
        <main className='py-3'>
          <Container>
            <Route exact path='/' component={Home} />
            <Route path='/product/:id' component={Product} />
          </Container>
        </main>
        <Footer/>
    </Router>
  )
}

export default App
