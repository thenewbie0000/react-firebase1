import React, { useState } from 'react'
import {auth, googleProvider} from '../config/firebase'
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async() =>{
    try{
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User Signed In");
    } catch(err){
      console.error(err);
    }
  }

  const signInWithGoogle = async() =>{
    try{
      await signInWithPopup(auth, googleProvider);
      alert("User Signed In");
    } catch(err){
      console.error(err);
      alert("Failed to sign in with Google.");
    }
  }

  const logOut = async() =>{
    try{
      await signOut(auth);
      alert("User Logged Out.")
    } catch(err){
      console.error(err);
    }
  }

  return (
    <div>
      <input
       type="text"
       placeholder='Email...' 
       onChange={(e) =>setEmail(e.target.value)} 
      />
      <input
       type="password" 
       placeholder='Password' 
       onChange={(e) =>setPassword(e.target.value)}  
      />

      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={logOut}>Log Out</button>
    </div>
  )
}

export default Auth;
