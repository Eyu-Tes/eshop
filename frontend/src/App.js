import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/pages/Home'
import ProductDetail from './components/pages/ProductDetail'
import Cart from './components/pages/Cart'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Profile from './components/pages/Profile'
import Shipping from './components/pages/Shipping'
import Payment from './components/pages/Payment'
import PlaceOrder from './components/pages/PlaceOrder'
import Order from './components/pages/Order'
import UserList from './components/pages/UserList'
import UserEdit from './components/pages/UserEdit'
import ProductList from './components/pages/ProductList'
import ProductForm from './components/pages/ProductForm'
import OrderList from './components/pages/OrderList'
import UserContextProvider from './context/user/UserContext'
import ProductContextProvider from './context/product/ProductContext'
import CartContextProvider from './context/cart/CartContext'
import OrderContextProvider from './context/order/OrderContext'

const App = () => {
  return (
    <UserContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
          <OrderContextProvider>
            <Router>
              <Header/>
              <main className='py-3'>
                <Container>
                  <Route exact path='/' component={Home} />
                  <Route path='/product/:id' component={ProductDetail} />
                  {/* Make id parameter optional by adding '?' */}
                  <Route path='/cart/:id?' component={Cart} />
                  <Route path='/shipping' component={Shipping} />
                  <Route path='/payment' component={Payment} />
                  <Route path='/placeorder' component={PlaceOrder} />
                  <Route path='/order/:id' component={Order} />
                  <Route path='/signin' component={Login} />
                  <Route path='/signup' component={Register} />
                  <Route path='/profile' component={Profile} />
                  <Route exact path='/admin/users' component={UserList} />
                  <Route path='/admin/users/:id/edit' component={UserEdit} />
                  <Route exact path='/admin/products' component={ProductList} />
                  <Route path='/admin/products/form/:id?' component={ProductForm} />
                  <Route exact path='/admin/orders' component={OrderList} />
                </Container>
              </main>
              <Footer/>
            </Router>
          </OrderContextProvider>
        </CartContextProvider>
      </ProductContextProvider>
    </UserContextProvider>
  )
}

export default App
