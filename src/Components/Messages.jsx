import React, { useContext, useEffect, useState } from 'react'
import Message from "../Components/Message"
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'


const Messages = () => {
  const [messages,setMessages] = useState([])
  const {data} = useContext(ChatContext)

  useEffect(() => {
    if(!data.flag) {
      const unSub = onSnapshot(
        doc(db,"chats", data.chatId),
        (doc) =>{
          doc.exists() && setMessages(doc.data().messages)
        }
      )
      
      return () =>{
        unSub();
      }
    }else{
      const unSub = onSnapshot(
        doc(db,"AIchats",
        data.chatId),(doc) =>{
          doc.exists() && setMessages(doc.data().messages);
        }
      )

      return () =>{
        unSub();
      }
    }
  },[data.chatId,data.flag])

  return (
    <div className='messages'>
      {
        messages.map((m) =>{
          return <Message msg={m} key={m.id} />
        })
      }
    </div>
  )
}

export default Messages
