











// context for a loading effect while user is wating for the response from the MY AI chat

// it set true when the backend is loading the the response form the openai API and vice versa








import { createContext, useState } from "react";


export const LoadingContext = createContext();

export const LoadingContextProvider = ({children})=>{
    
    const {isWaitingForResponse,setIsWaitingForResponse} = useState(false);

    return( 
        <LoadingContext.Provider value={{isWaitingForResponse,setIsWaitingForResponse}}>
            {children}
        </LoadingContext.Provider>
    )
};






















