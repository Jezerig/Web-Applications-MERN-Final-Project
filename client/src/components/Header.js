import {useNavigate} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function Header() {
    // source: https://stackoverflow.com/questions/53835816/decode-jwt-token-react
    let user = null

    const navigate = useNavigate();

    //Render if-statement https://stackoverflow.com/questions/40477245/is-it-possible-to-use-if-else-statement-in-react-render-function
    let loggedIn = false;
    if(localStorage.getItem('token')) {
        loggedIn = true;
        user = jwt_decode(localStorage.getItem('token'));
    }
    const logout = () => {
        if(loggedIn) {
            localStorage.removeItem('token');
        }
        navigate('/')
    };
return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand >Questioning Coding</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">Posts</Nav.Link>
                {!loggedIn && <Nav.Link href="/login">Login</Nav.Link>}
                {!loggedIn && <Nav.Link href="/register">Register</Nav.Link>}
                {loggedIn && <Nav.Link href="/createpost">Create Post</Nav.Link>}
                {loggedIn && <Nav.Link href={"/user/" + user.id}>My Profile</Nav.Link>}
                {loggedIn && <Nav.Link onClick={logout}>Logout</Nav.Link>}
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
    </div>
)
}


export default Header