import { NavLink } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav } from 'react-bootstrap'

const Header = () => {
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
                                <NavLink className="nav-link" to="/signin">
                                    <i className='fa fa-user'></i> Sign In
                                </NavLink>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
