import React from 'react'
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function PostPage() {
    const {postid} = useParams()
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
    }, [postid])


    return (
        <div>
            <p>{post.username}</p>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
            <p>{post.lastedited}</p>

        </div>
    )
}

export default PostPage
