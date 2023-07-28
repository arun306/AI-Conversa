import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import {auth} from "../firebase"





export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [currentUser,setCurrentUser] = useState({})
    useEffect(()=>{
        // a method that is inovoked when a user registers or user logins
        const unsub = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
            // console.log(user);
            // console.log("auth state change is triggered");
            // console.log(children)
        })

        return ()=>{
            unsub();
        }
    },[]);

    return( 
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
};























// import { onAuthStateChanged } from "firebase/auth";
// import { createContext, useEffect, useState } from "react";
// import { auth } from "../firebase";


// export const AuthContext = createContext();

// export const AuthContextProvider = ({children}) => {
//     const [currentUser,setCurrentUser] = useState({})

//     useEffect(() => {
//         onAuthStateChanged(auth,(user)=>{
//             setCurrentUser(user);
//             console.log(user);
//         })
//     },[]);

//     <AuthContext.Provider value={{currentUser}}>
//         {children}
//     </AuthContext.Provider>
// }





