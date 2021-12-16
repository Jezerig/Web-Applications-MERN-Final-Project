import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function UserPage() {
    const [user, setUser] = useState([{
        "_id": null,
        "username": null,
        "email": null,
        "bio": null,
        "registerdate": null
      }]);
    const {userid} = useParams()
    
    useEffect(() => {
        let mounted = true;
        async function fetchUser() {
            let url = '/api/user/' + userid;
            let response = await fetch(url);
            let dataJson = await response.json();
            if (mounted) {
                console.log(dataJson);
                setUser(dataJson);
            }
        }
        fetchUser();
        return () => {
            mounted = false;
        };
    // eslint-disable-next-line
    }, [])
    // Source for registeration date parsing: https://www.tutorialguruji.com/react-js/why-do-i-get-rangeerror-date-value-is-not-finite-in-datetimeformat-format-when-using-intl-datetimeformat-in-react/
    return (
        <div className="m-3">
            <Card border="primary">
                <Card.Body>
                    <Card.Title>
                        {user.username}
                    </Card.Title>
                    <Card.Text>
                        {user.registerdate?.length > 0 && <p>Register Date: {new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(user.registerdate.toString()))}</p>}
                        <p>Bio: {user.bio}</p>
                    </Card.Text>
                </Card.Body>
            </Card>     
        </div>
    )
}

export default UserPage
