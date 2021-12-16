import React from 'react'
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Comment from './Comment';
import {useNavigate} from 'react-router-dom';

function PostPage() {
    const navigate = useNavigate();
    let loggedIn = false;
    if(localStorage.getItem('token')) {
        loggedIn = true;
    }

    const {postid} = useParams()
    const [comment, setComment] = useState([{
        "username": null,
        "userid": null,
        "postid":  null,
        "lastedited": null,
        "text": null
      }]);

    const [comments, setComments] = useState([{
        "_id": null,
        "username": null,
        "userid": null,
        "postid": null,
        "lastedited": null,
        "text": null
      }]);

    const [post, setPost] = useState([{
        "_id": null,
        "username": null,
        "userid": null,
        "lastedited": null,
        "title": null,
        "text": null,
        "comments": null
      }]);

    useEffect(() => {
        let mounted = true;
        async function fetchPost() {
            let url = "/api/post/" + postid;
            let response = await fetch(url);
            let dataJson = await response.json();
            if (mounted) {
                setPost(dataJson);
            }
        }
        fetchPost();
        return () => {
            mounted = false;
        };
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        let mounted = true;
        async function fetchComments() {
            let url = '/api/comment/' + postid;
            let response = await fetch(url);
            let dataJson = await response.json();
            if (mounted) {
                setComments(dataJson);
            }
        }
        fetchComments();
        return () => {
            mounted = false;
        };
    // eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        setComment({...comment, [e.target.name]: e.target.value})
    }

    const submit = (e) => {
        e.preventDefault()
        comment.postid = postid
        fetch("/api/addcomment", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(comment),
            mode: "cors"
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }
    return (
        <div>
            <div>
                <p onClick={() => navigate('/user/' + post.userid)}>{post.username}</p>
                <h1>{post.title}</h1>
                <p>{post.text}</p>
                <p>{post.lastedited}</p>
            </div>
            <div>
                <ul>
                    {comments?.length > 0 ? comments.map((comment) => (
                        <Comment key={comment._id} comment={comment}/>
                    )) : "No comments."}
                </ul>
            </div>
            {loggedIn && <div>
                <form onSubmit={submit} onChange={handleChange}>
                    <label>Text<input type="text" name="text" /></label>
                    <input type="submit" />
                </form>
            </div>}
        </div>
        

    )
}

export default PostPage
