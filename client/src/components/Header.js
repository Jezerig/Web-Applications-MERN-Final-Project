import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link as RouterLink} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    //Render if-statement https://stackoverflow.com/questions/40477245/is-it-possible-to-use-if-else-statement-in-react-render-function
    let loggedIn = false;
    if(localStorage.getItem('token')) {
        loggedIn = true;
    }
    const logout = () => {
        if(loggedIn) {
            localStorage.removeItem('token');
        }
        navigate('/')
    };
return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button component={RouterLink} to="/" color="inherit">Posts</Button>
                    {!loggedIn && <Button component={RouterLink} to="/login" color="inherit">Login</Button>}
                    {!loggedIn && <Button component={RouterLink} to="/register" color="inherit">Register</Button>}
                    {loggedIn && <Button color="inherit">My Profile</Button>}
                    {loggedIn && <Button onClick={logout} color="inherit">Logout</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    </div>
)
}

export default Header