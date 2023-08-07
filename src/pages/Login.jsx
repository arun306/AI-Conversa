import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import LoadingOverlay from '../Annimations/LoadingOverlay';



const Login = () => {
  
  const [err,setErr]  = useState(false)
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;

    try{

      // const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      navigate('/')    // then we navigate to the home Page !!

    }catch(err){
      setErr(true);
      setIsLoading(false);
    }
     
  };

  return (
    <>
      {
        isLoading ? (<LoadingOverlay /> ) : 
        (
          <div className="formContainer">
              <div className="formWrapper">
                  <span className="logo">AI Conversa </span>
                  <span className="title">Login</span>
                  
                  <form onSubmit={handleSubmit} >
                      <input type='email' placeholder='email' ></input>
                      <input type='password' placeholder='password'></input>
                      <button>
                        {/* {
                          isLoading ? <div style={{textAlign:"center"}} className="loader"></div> : "Login" 
                        } */}
                        Login
                      </button>
                  </form>
                  {err &&
                    <span style={{color:"red"}}>something went wrong</span>
                  }
                  <p>Don't have an account? <Link to='/register'>Register</Link> </p>
              </div>
          </div>
        )
      
      }

    </>
  )
}

export default Login
