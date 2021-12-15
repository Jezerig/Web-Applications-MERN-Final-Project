import React from 'react'
import {useState, useEffect} from 'react';
import Post from './Post';
function Posts() {
    const [posts, setPosts] = useState([{
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
        async function fetchPosts() {
            let url = '/api/posts';
            let response = await fetch(url);
            let dataJson = await response.json();
            if (mounted) {
                setPosts(dataJson);
            }
        }
        fetchPosts();
        return () => {
            mounted = false;
        };
    }, [])
    //Source map reverse: https://stackoverflow.com/questions/37664041/react-given-an-array-render-the-elements-in-reverse-order-efficiently
    return (
        <div>
            <ul>
                {[...posts].reverse().map((post) => (
                    <Post key={post._id} post={post}/>
                ))}
            </ul>
        </div>
    )
}

export default Posts