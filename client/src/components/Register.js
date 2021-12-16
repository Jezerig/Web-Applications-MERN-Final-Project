import {useState} from 'react'
import {useNavigate} from 'react-router-dom';
//source on how to use toasts: https://fkhadra.github.io/react-toastify/introduction
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
        <div className="m-3">
            <ToastContainer />
            {!loggedIn && <h1>Register</h1>}
            {loggedIn && <h1>Can't register whilst logged in.</h1>}
            {!loggedIn && 
            <div>
                <Form onSubmit={submit} onChange={handleChange}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control  name="username" type="username" placeholder="Enter username" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control  name="email" type="email" placeholder="Enter email" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" required/>
                        <Form.Text className="ms-2 text-muted ">
                        <h6>Password requirements:</h6>
                        <ul>
                            <li>at least one lowercase letter</li>
                            <li>at least one uppercase letter</li>
                            <li>at least one number</li>
                            <li>at least one symbol</li>
                        </ul>
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control as="textarea" rows={3} name="bio"/>
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Register
                    </Button>
                </Form>
            </div>}
        </div>
    )
}

export default Register
