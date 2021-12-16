import React from 'react'
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Comment from './Comment';
import {useNavigate} from 'react-router-dom';
//source on how to use toasts: https://fkhadra.github.io/react-toastify/introduction
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PostPage() {
    const navigate = useNavigate();
    // https://dev.to/alibahaari/how-to-re-fetch-data-when-something-changes-in-reactjs-375m
    // toggle used to inform page to re-fetch data when new comment is added.
    const [newCommentToggle, setNewCommentToggle] = useState(false);
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
            setNewCommentToggle(false);
            mounted = false;
        };
    // eslint-disable-next-line
    }, [newCommentToggle])

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
                if(data.success) {
                    console.log(data)
                    setNewCommentToggle(true)
                } else {
                    toast.error("Ran into an error.", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                
            })
    }
    // Source for registeration date parsing: https://www.tutorialguruji.com/react-js/why-do-i-get-rangeerror-date-value-is-not-finite-in-datetimeformat-format-when-using-intl-datetimeformat-in-react/
    return (
        <div>
            <ToastContainer />
            <div>
                <p onClick={() => navigate('/user/' + post.userid)}>{post.username}</p>
                <h1>{post.title}</h1>
                <p>{post.text}</p>
                {post.lastedited?.length > 0 && <p>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(post.lastedited.toString()))}</p>}
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
