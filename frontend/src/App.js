import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/pages/Home'
import ProductDetail from './components/pages/ProductDetail'
import Cart from './components/pages/Cart'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import UserContextProvider from './context/user/UserContext'
import ProductContextProvider from './context/product/ProductContext'
import CartContextProvider from './context/cart/CartContext'

const App = () => {
  return (
    <UserContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
          <Router>
            <Header/>
            <main className='py-3'>
              <Container>
                <Route exact path='/' component={Home} />
                <Route path='/product/:id' component={ProductDetail} />
                {/* Make id parameter optional by adding '?' */}
                <Route path="/cart/:id?" component={Cart} />
                <Route path='/signin' component={Login} />
                <Route path='/signup' component={Register} />
              </Container>
            </main>
            <Footer/>
          </Router>
        </CartContextProvider>
      </ProductContextProvider>
    </UserContextProvider>
  )
}

export default App
