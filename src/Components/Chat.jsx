import React, { useContext } from 'react'
import Cam from "../img/cam.png"
import Add from "../img/add.png"
import More from "../img/more.png"
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'





const Chat = () => {

  const {data} = useContext(ChatContext)
  // console.log(data);

  return (
    <>
      {
        data.chatId === "null" &&
        (
          <div className="chat" style={
            {
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center"
              
            }
          }>
              <h4>click on chats to open here !</h4>
              
          </div>
        )

        
      }


      {/* if no chat was selected empty screen to display */}
      {
        data.chatId !== "null" &&
        (
          <div className="chat">
              <div className="chatInfo">
                
                <span><b>{data.user.displayName}</b></span>
                <div className="chatIcons">
                <img src={Cam} alt="" />
                  <img src={Add} alt="" />
                  <img src={More} alt="" />
              </div>
            </div>
            <Messages/>
            <Input/>
          </div>
        )
      }
    </>
  )
}

export default Chat
