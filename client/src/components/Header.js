import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link as RouterLink} from 'react-router-dom';

function Header() {
return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button component = {RouterLink} to="/" color="inherit">Posts</Button>
                    <Button component = {RouterLink} to="/login" color="inherit">Login</Button>
                    <Button component = {RouterLink} to="/register" color="inherit">Register</Button>
                </Toolbar>
            </AppBar>
        </Box>
    </div>
)
}

export default Header