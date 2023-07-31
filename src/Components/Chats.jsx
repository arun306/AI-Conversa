import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {

  const [chats, setChats] = useState([])

  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)


  // whenever a change or update happens in the userChats collection we need track using the realtime firebase method
  // this helps to refreshh the chats part whom the current use is chatted with 
  useEffect(()=>{
    const getChats=()=>{
      const unsub = onSnapshot(doc(db, "userChats",currentUser.uid), (doc) => {
          // console.log("Current data: ", doc.data()); 
          setChats(doc.data());
      });

      return() =>{ 
        unsub();
      };
    }

    currentUser.uid && getChats();
    // getChats();

  },[currentUser.uid])

  // console.log(Object.entries(chats)) 
  // console.log(chats) 

  const handleSelect = (u) => {
    // console.log(u)
    dispatch({type:"CHANGE_USER",payload : u})
  }


  const AIselectHandle = async () =>{
    try{
      const res = await getDoc(doc(db,'AIchats',currentUser.uid));
      if(!res.exists()){
        await setDoc(doc(db,'AIchats',currentUser.uid),{messages : []})
      }

      const u = {
        displayName : "My AI",
        photoURL : "https://cdn.pixabay.com/photo/2022/01/11/21/48/link-6931554_640.png",
        uid : currentUser.uid
      }
      
      // console.log(u)
      dispatch({type:"CHANGE_USER_AI",payload : u })

    }catch{

    }
  }


  return (
    <div className="chats">

        <div className="userChat" 
          onClick={AIselectHandle}
          >
            <img src="https://cdn.pixabay.com/photo/2022/01/11/21/48/link-6931554_640.png" alt="" />
            <div className="userChatInfo">
              <span>kkmk</span>
              <p>last msg</p>
            </div>
          </div>


      {
        Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat) => (
          <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Chats
