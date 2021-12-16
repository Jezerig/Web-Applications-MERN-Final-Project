import React from 'react'
import {useNavigate} from 'react-router-dom';

function Comment({comment}) {
    const navigate = useNavigate();
    // Source for registeration date parsing: https://www.tutorialguruji.com/react-js/why-do-i-get-rangeerror-date-value-is-not-finite-in-datetimeformat-format-when-using-intl-datetimeformat-in-react/
    return (
        <div>
            <p id={comment.userid} onClick={() => navigate('/user/' + comment.userid)}>{comment.username}</p>
            <p>{comment.text}</p>
            {comment.lastedited?.length > 0 && <p>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(comment.lastedited.toString()))}</p>}
        </div>
    )
}

export default Comment
