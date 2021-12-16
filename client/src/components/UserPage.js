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
                setUser(dataJson);
            }
        }
        fetchUser();
        return () => {
            mounted = false;
        };
    // eslint-disable-next-line
    }, [])

    return (
        <div>
            <ul> 
                <li>Username: {user.username}</li>
                <li>Register Date: {user.registerdate}</li>
                <li>Bio: {user.bio}</li>
            </ul>
        </div>
    )
}

export default UserPage
