import React from 'react'
import {useNavigate} from 'react-router-dom';

function Post({post}) {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate('/post/' + post._id.toString())}>
            <p onClick={() => navigate('/user/' + post.userid)}>{post.username}</p>
            <p>{post.title}</p>
        </div>
    )
}

export default Post
