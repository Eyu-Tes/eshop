import { useContext } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import SerachProduct, { SearcProduct } from '../products/SearchProduct'
import { UserContext } from '../../context/user/UserContext'

const Header = () => {
    const { user, logout } = useContext(UserContext)

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to=''>
                        <Navbar.Brand>eshop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Route render={({history}) => <SerachProduct history={history}/>}/>
                        <Nav className='ml-auto'>
                            <Nav.Item>
                                <NavLink className="nav-link" to='/cart'>
                                    <i className='fa fa-shopping-cart'></i> Cart
                                </NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                {user ? (
                                    <NavDropdown title={user.name} id='username'>
                                        <NavDropdown.Item as="div">
                                            <NavLink to='/profile' className="d-block text-decoration-none">
                                                Profile
                                            </NavLink>
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={() => logout()}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <NavLink className="nav-link" to="/signin">
                                        <i className='fa fa-user'></i> Sign In
                                    </NavLink>  
                                )}
                            </Nav.Item>
                            <Nav.Item>
                                {(user && user.isAdmin) && (
                                    <NavDropdown title='Admin' id='adminmenu'>
                                        <NavDropdown.Item as="div">
                                            <NavLink to='/admin/users' className="d-block text-decoration-none">
                                                Users
                                            </NavLink>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as="div" style={{margin: '.5rem 0'}}>
                                            <NavLink to='/admin/products' className="d-block text-decoration-none">
                                                Products
                                            </NavLink>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as="div">
                                            <NavLink to='/admin/orders' className="d-block text-decoration-none">
                                                Orders
                                            </NavLink>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                )}
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
