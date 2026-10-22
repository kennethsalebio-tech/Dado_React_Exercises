import { useState, useEffect } from "react";
import axios from "axios";

export default function List() {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchuser = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                const data = response.data;
                setUser(data);
                
            } catch (error) {
                console.error("Error fetching data.", error.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchuser();
    }, []);
    
    if (loading) return <p>Loading...</p>;

    return (
        <ul>
          {user.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>  
    );
}
