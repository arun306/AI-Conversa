
import React, { useContext, useEffect } from "react";
import "./styles.scss"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Register from "./pages/Register";

import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const {currentUser} = useContext(AuthContext);

  // protected route
  // console.log(currentUser)
  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to='/login' />
    }
    return children;
  }
  // const ProtectedRoute1 = ({children}) =>{
  //   if(currentUser){
  //     return <Navigate to='/' />
  //   }
  //   return children;
  // }

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      signOut(auth);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);




  // for handling escape button to remove/close opened chat

  const {dispatch} = useContext(ChatContext);
  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === 'Escape') {
        // Handle the Escape key press event here
        // console.log('Escape key pressed!');
        dispatch({type: "DELETE_USER"})
      }
    };

    document.addEventListener('keydown', handleEscapeKeyPress);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  });




  return (
  
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
            />
          <Route 
            path='register' 
            element={
              // <ProtectedRoute1>
              <Register />
              // </ProtectedRoute1>
            } 
            />
          <Route 
            path='login' 
            element={
              // <ProtectedRoute1>
              <Login />
              // </ProtectedRoute1>
            } 
            />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
