import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Createpost() {
    const navigate = useNavigate();
    let loggedIn = false;
    if(localStorage.getItem('token')) {
        loggedIn = true;
    }
    const [postData, setPostData] = useState({})

    const submit = (e) => {
        e.preventDefault()

        fetch("/api/newpost", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(postData),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
        navigate('/')
    }

    const handleChange = (e) => {
        setPostData({...postData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            {!loggedIn && <h1>Can't create a Post whilst not logged in.</h1>}
            {loggedIn && <h1>Create a new Post.</h1>}
            {loggedIn && <div>
                <form onSubmit={submit} onChange={handleChange}>
                    <label>Title<input type="text" name="title" /></label>
                    <label>Text<input type="text" name="text" /></label>
                    <input type="submit" />
                </form>
            </div>}
        </div>
    )
}

export default Createpost
