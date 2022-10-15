import './App.css';
import { getAuth , signInWithPopup , signOut} from "firebase/auth";
import app from './components/firebaseElements';
import { GoogleAuthProvider , FacebookAuthProvider} from "firebase/auth";
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  //const auth = getAuth(app);
  const providerGoogle = new GoogleAuthProvider();
  const providerFacebook = new FacebookAuthProvider();
  const [users , setUsers] = useState({})
  const onLoadGoogleSignIn = () =>{
  signInWithPopup(auth, providerGoogle)
  .then((result) => {
        const user = result.user;
        console.log(user)
        setUsers(user)})
  .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  });
  }
  
  const onLoadGoogleSignOut = () =>{
    signOut(auth)
    .then(() => {
      setUsers({});
    })
    .catch(() => {
      setUsers({})
    })
  }

  const onLoadFacebookSignIn = () =>
  {
    signInWithPopup(auth, providerFacebook)
    .then((result) => {
          const user = result.user;
          console.log(user)
          setUsers(user)})
    .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
    });
  }

  const onLoadFacebookSignOut =()=>
  {
    signOut(auth)
    .then(() => {
      setUsers({});
    })
    .catch(() => {
      setUsers({})
    })
  }

  return (
    <div className='App'>
   
     {
        users.uid ?
          <>
             <button onClick={onLoadGoogleSignOut}>Sign Out</button>
             <button onClick={onLoadFacebookSignOut}>Facebook Out</button>
          </>
           :
          <>
             <button onClick={onLoadGoogleSignIn}>Google Sing In</button>
             <button onClick={onLoadFacebookSignIn}>Facebook Sing In</button>
          </>
      }
     
      
      
   
        {users.uid && <div>
        <h3>User name: {users.displayName}</h3>
        <p>Email address: {users.email}</p>
        <img src={users.photoURL} alt="" />
      </div>}
    
        
      
    </div>
  );
}

export default App;
