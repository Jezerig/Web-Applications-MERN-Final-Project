import React from 'react'
import {useNavigate} from 'react-router-dom';
import Card from 'react-bootstrap/Card';

//Displays single comment with text, username, and date
function Comment({comment}) {
    //used to navigate to different url https://stackoverflow.com/questions/62861269/attempted-import-error-usehistory-is-not-exported-from-react-router-dom
    const navigate = useNavigate();
    // React-bootstrap Card used to create better UI
    //When username is clicked -> sends to that user's profile page
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
// Source for date parsing: https://www.tutorialguruji.com/react-js/why-do-i-get-rangeerror-date-value-is-not-finite-in-datetimeformat-format-when-using-intl-datetimeformat-in-react/
export default Comment
