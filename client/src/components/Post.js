import React from 'react'
import {useNavigate} from 'react-router-dom';
import Card from 'react-bootstrap/Card';

//Displays single post on '/'
function Post({post}) {
    //used to navigate to different url
    const navigate = useNavigate();
    //if userename is clicked -> navigate to user's profile page
    return (
        <div>
            <Card border="dark">
                <Card.Body onClick={() => navigate('/post/' + post._id)}>
                    <Card.Title>
                        {post.title}
                    </Card.Title>
                    <Card.Text size="2" class="text-truncate">
                        {post.text}{'...'}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                
                <small onClick={() => navigate('/user/' + post.userid)}>By: {post.username}</small>
                <br/>
                {post.lastedited?.length > 0 && <small>Last edited: {new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(post.lastedited.toString()))}</small>}
                </Card.Footer>
            </Card>
        </div>
    )
}
// Source for date parsing: https://www.tutorialguruji.com/react-js/why-do-i-get-rangeerror-date-value-is-not-finite-in-datetimeformat-format-when-using-intl-datetimeformat-in-react/

export default Post
