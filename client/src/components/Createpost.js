import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
        <div className="m-3">
            {!loggedIn && <h1>Can't create a Post whilst not logged in.</h1>}
            {loggedIn && <h1>Create a new Post</h1>}
            {loggedIn && <div>
            <Form onSubmit={submit} onChange={handleChange}>
                <Form.Group className="mb-3" >
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" type="text" placeholder="Post title" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control name="text" as="textarea" rows={3} required/>
                </Form.Group>
                <Button variant="dark" type="submit">
                    Submit Post
                </Button>
            </Form>
        </div>} 
        </div>
    )
}

export default Createpost
