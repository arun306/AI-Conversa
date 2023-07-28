import { createContext, useContext, useReducer } from "react";

import { AuthContext } from "./AuthContext";





export const ChatContext = createContext();





export const ChatContextProvider = ({children})=>{
    
    const {currentUser} = useContext(AuthContext);

    const INITIAL_STATE = {
        chatId : 'null',
        user : {},
        flag : false
    }

    const chatReducer = (state,action) => {
        switch(action.type){
            case "CHANGE_USER":
                return {
                    user : action.payload,
                    chatId : 
                        currentUser.uid > action.payload.uid ? 
                        currentUser.uid + action.payload.uid : 
                        action.payload.uid + currentUser.uid,
                    flag : false
                }
            
            case "DELETE_USER" :  return INITIAL_STATE

            case "CHANGE_USER_AI":
                return {
                    user : action.payload,
                    chatId : currentUser.uid,
                    flag : true,
                    isWaitingForResponse : false
                }
            default :
                return state
        }
    };   

    const [state,dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return( 
        <ChatContext.Provider value={{data:state,dispatch}}>
            {children}
        </ChatContext.Provider>
    )
};














