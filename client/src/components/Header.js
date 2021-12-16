import {useNavigate} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

//navbar at the top of the page
function Header() {
    let user = null
    //used to navigate to different url https://stackoverflow.com/questions/62861269/attempted-import-error-usehistory-is-not-exported-from-react-router-dom
    const navigate = useNavigate();

    //logged in status boolean
    let loggedIn = false;
    if(localStorage.getItem('token')) {
        loggedIn = true;
        // source: https://stackoverflow.com/questions/53835816/decode-jwt-token-react
        // user is parsed from jwt token
        user = jwt_decode(localStorage.getItem('token'));
    }

    //on logout remove token and return to '/'
    const logout = () => {
        if(loggedIn) {
            localStorage.removeItem('token');
        }
        navigate('/')
    };

    //If user is logged in login and register page are hidden, and Create Post, My Profile and Logout are shown.
    //Navbar created with react-bootstrap
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