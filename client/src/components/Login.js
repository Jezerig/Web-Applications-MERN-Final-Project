import {useState} from 'react';
// Source for redirect after login
//https://stackoverflow.com/questions/34119793/react-router-redirection-after-login
//https://stackoverflow.com/questions/62861269/attempted-import-error-usehistory-is-not-exported-from-react-router-dom
import {useNavigate} from 'react-router-dom';

// source: https://www.youtube.com/watch?v=dJHnVB_6QUs
function Login() {
    let loggedIn = false;
    if(localStorage.getItem('token')) {
        loggedIn = true;
    }

    const [userData, setUserData] = useState({})
    const navigate = useNavigate();
    const submit = (e) => {
        e.preventDefault()
        fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                if(data.token) {
                    localStorage.setItem('token', data.token)
                    navigate('/');
                }
            })

    }

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            {!loggedIn && <h1>Login</h1>}
            {loggedIn && <h1>You're already logged in.</h1>}
            {!loggedIn && <div>
                <form onSubmit={submit} onChange={handleChange}>
                    <label>Email<input type="text" name="email" /></label>
                    <label>Password<input type="password" name="password" /></label>
                    <input type="submit" />
                </form>
            </div>}
        </div>
    )
}

export default Login
