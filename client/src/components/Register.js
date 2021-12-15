import {useState} from 'react'

function Register() {
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
                console.log(data)
            })

    }

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            {!loggedIn && <h1>Register</h1>}
            {loggedIn && <h1>Can't register whilst logged in.</h1>}
            {!loggedIn && <div>
                <form onSubmit={submit} onChange={handleChange}>
                    <label>Username<input type="text" name="username" /></label>
                    <label>Email<input type="text" name="email" /></label>
                    <label>Password<input type="password" name="password" /></label>
                    <label>Bio<input type="text" name="bio" /></label>
                    <input type="submit" />
                </form>
            </div>}
        </div>
    )
}

export default Register
