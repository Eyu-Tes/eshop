import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { UserContext } from '../../context/user/UserContext'
import { underline } from 'colors'

const Header = () => {
    const { user, logout } = useContext(UserContext)

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
                <Container>
                    <LinkContainer to=''>
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
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
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
