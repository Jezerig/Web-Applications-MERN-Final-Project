import React from 'react'
import {useNavigate} from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function Comment({comment}) {
    const navigate = useNavigate();
    // Source for registeration date parsing: https://www.tutorialguruji.com/react-js/why-do-i-get-rangeerror-date-value-is-not-finite-in-datetimeformat-format-when-using-intl-datetimeformat-in-react/
    return (
        <div>
            <Card border="secondary">
                <Card.Body>
                    <Card.Text>
                        {comment.text}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small onClick={() => navigate('/user/' + comment.userid)}>By: {comment.username}</small>
                <br/>
                {comment.lastedited?.length > 0 && <small>Last edited: {new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(comment.lastedited.toString()))}</small>}
                </Card.Footer>
            </Card>
        </div>
    )
}

export default Comment
