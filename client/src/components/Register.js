import {useState} from 'react'
import {useNavigate} from 'react-router-dom';
//source on how to use toasts: https://fkhadra.github.io/react-toastify/introduction
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const navigate = useNavigate();
    let loggedIn = false;
    if(localStorage.getItem('token')) {
        loggedIn = true;
    }
    const [userData, setUserData] = useState({})

    const submit = (e) => {
        e.preventDefault()

        fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    console.log(data);
                    navigate('/');
                } else {
                    if (data.errors !== undefined) {
                    if(data.errors[0] !== undefined) {
                        toast.error(data.errors[0].msg + " " + data.errors[0].param, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else if(data.errors[1] !== undefined) {
                        toast.error(data.errors[1].msg + " " + data.errors[1].param, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } 
                } else {
                    toast.error(data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                }
            })

    }

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <ToastContainer />
            {!loggedIn && <h1>Register</h1>}
            {loggedIn && <h1>Can't register whilst logged in.</h1>}
            {!loggedIn && <div>
                <form onSubmit={submit} onChange={handleChange}>
                    <label>Username<input type="text" name="username" required/></label>
                    <label>Email<input type="text" name="email" required/></label>
                    <label>Password<input type="password" name="password" required/></label>
                    <label>Bio<input type="text" name="bio" /></label>
                    <input type="submit" />
                </form>
            </div>}
        </div>
    )
}

export default Register
