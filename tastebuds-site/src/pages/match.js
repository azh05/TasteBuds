import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import CSS for external styling
import '../styles/match.css';
import MatchedProfile from '../components/MatchedProfile';
import { useUser } from '../userinfo/UserContext'
import Navbar from '../components/navigationbar';


function Match() {

    const { user } = useUser();
    const [info, setInfo] = useState([{ name: "Min Gao", age: "35", food: "Italian", email:"mingao@cs.ucla.edu" }]);

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const email = user.email;
                    const response = await fetch(`http://localhost:5001/likes?email=${email}`)
    
                    if (!response.ok) {
                        throw new Error(`lol sorry`);
                    }

                    const result = await response.json();
                    console.log(result)
                    setInfo(result);
                } catch (err) {
                    console.log(err.message);
                }
            } 

            fetchData();
        } 
    }, [])


    if (!user) {
        return (
          <div>
            <Navbar />
            <div className="not-logged-in">
              <div>Must be Logged In</div>
            </div>
          </div>
        );
      }
      

/* errors because tries to evaluate info.name but it is set to null earlier, probably will run into the same issue with  */
    return (
    <div>
        <Navbar></Navbar>
        <div className="match-page-total">
            <h1 className="match-title" >Matches</h1>
        <div className="horizontal-line" ></div>
        <div className = "match-container">
            {info.map((user) =>  (
                <div key={user.email} className="match-item">
                    <Link to={`/profile/${user.email}`} 
                        className="match-name-link" style={{ textDecoration: 'none' }}>
                    <MatchedProfile name={user.profileName} age={user.age} food={user.cuisine} mail={user.email}/>
                    </Link>
            </div>
            ))}
            
        </div>
        </div>
    </div>
    )
}

export default Match;