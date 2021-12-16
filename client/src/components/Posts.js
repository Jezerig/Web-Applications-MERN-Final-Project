import {useState, useEffect} from 'react';
import Post from './Post';

//Home page list of posts
function Posts() {
    const [posts, setPosts] = useState([{
        "_id": null,
        "username": null,
        "userid": null,
        "lastedited": null,
        "title": null,
        "text": null
      }]);

    //fetches posts from /api/posts
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
    // Source map reverse: https://stackoverflow.com/questions/37664041/react-given-an-array-render-the-elements-in-reverse-order-efficiently
    return (
        <div className="m-3">
            <h1>Posts</h1>
            {[...posts].reverse().map((post) => (
                <Post key={post._id} post={post}/>
            ))}
        </div>
    )
}

export default Posts