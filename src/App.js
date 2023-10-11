// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode'; 

function App() {
  const [user, setUser] = useState({});
  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    var ObjectUser = jwt_decode(response.credential);

    console.log(ObjectUser);

    setUser(ObjectUser);
    document.getElementById("SingDiv").hidden = true;
  }
  function handleLogout() {
    setUser({});
    document.getElementById("SingDiv").hidden = false;
  }
  
  useEffect(() => {
   window.google.accounts.id.initialize({
    //this is going to be the client_id from the google console
    client_id: "",
    callback: handleCredentialResponse,
   });
   window.google.accounts.id.renderButton(
    document.getElementById("SingDiv"),
    {theme: "outline", size: "large"}
   );
  }, []);

  return (
    <div className="App">
      <div id="SingDiv"></div>
      {
        Object.keys(user).length > 0 && 
        <button onClick={(e) => handleLogout(e)}>Logout</button>
      }
      {
        Object.keys(user).length !== 0 && 
        <div>
          <h1>Welcome {user.name}</h1>
          <h2>Your email is: {user.email}</h2>
          <img src={user.picture} alt={user.name} />
        </div>
      }
    </div>
  );
}

export default App;
