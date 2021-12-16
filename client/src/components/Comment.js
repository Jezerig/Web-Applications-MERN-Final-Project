import React from 'react'
import {useNavigate} from 'react-router-dom';

function Comment({comment}) {
    const navigate = useNavigate();
    return (
        <div>
            <p id={comment.userid} onClick={() => navigate('/users/' + comment.userid)}>{comment.username}</p>
            <p>{comment.text}</p>
        </div>
    )
}

export default Comment
