import React from 'react'

function Post({post}) {
    return (
        <div id={post._id}>
            <p id={post.userid}>{post.username}</p>
            <p>{post.title}</p>
        </div>
    )
}

export default Post
