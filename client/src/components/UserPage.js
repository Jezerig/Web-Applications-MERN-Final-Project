import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

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
        <div>
            <ul> 
                <li>Username: {user.username}</li>
                {user.registerdate?.length > 0 && <li>Register Date: {new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(user.registerdate.toString()))}</li>}
                <li>Bio: {user.bio}</li>
            </ul>
        </div>
    )
}

export default UserPage
