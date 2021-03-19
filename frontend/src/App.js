import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/pages/Home'
import ProductDetail from './components/pages/ProductDetail'
import Cart from './components/pages/Cart'
import ProductContextProvider from './context/product/ProductContext'

const App = () => {
  return (
    <ProductContextProvider>
      <Router>
        <Header/>
        <main className='py-3'>
          <Container>
            <Route exact path='/' component={Home} />
            <Route path='/product/:id' component={ProductDetail} />
            {/* Make id parameter optional by adding '?' */}
            <Route path="/cart/:id?" component={Cart} />
          </Container>
        </main>
        <Footer/>
      </Router>
    </ProductContextProvider>
  )
}

export default App
