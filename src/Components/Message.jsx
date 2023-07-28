import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { LoadingContext } from '../context/LoadingContext';

const Message = ({msg}) => {
  // console.log(msg);
  const {currentUser} = useContext(AuthContext); //current user
  const {data } = useContext(ChatContext) //other user

  const {isWaitingForResponse} = useContext(LoadingContext); // loading overlay

  const ref = useRef()

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior : 'smooth'})
  },[msg]);



  // identifying any urls in the text msgs using regex pattern
  const parseTextWithUrls = (text) => {
    console.log(isWaitingForResponse + "-----------asdfasdf-asdfas----------------");
    const urlRegex = /(https?:\/\/[^\s]+)/g; //g
    
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a href={part} key={index} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      }
      return part;
    });
  
  }
  
  
  


  // console.log(msg);
  return (
    <>
      {
        !data.flag &&
        <div 
          ref={ref}
          className={`message ${msg.senderId === currentUser.uid && "owner"}`}>

          <div className="messageInfo">
            <img 
              src={msg.senderId === currentUser.uid ? 
                currentUser.photoURL : 
                    data.user.photoURL
                  } 
              alt="" 
              />
            {/* <span>{msg.date}</span> */}
          </div>


          <div className="messageContent">
            <p>
                  {/* {msg.text} */}
                  {/* <parseTextWithUrls text={data.text} /> */}
                  {parseTextWithUrls(msg.text)}
            </p>

            {msg.img &&
              <img 
              src={msg.img} 
              alt="" 
              />
            }
          </div>

        </div>
      }

      {
        data.flag && 
        <div 
            ref={ref}
            className={`message ${ !msg.isChatGPTResponse && "owner"}`}>

            {
              isWaitingForResponse && 
                <>
                  <div className="messageInfo">
                    <img 
                      src={msg.isChatGPTResponse ? 
                            data.user.photoURL :
                            currentUser.photoURL 
                            
                          } 
                      alt="" 
                    />
                    {/* <span>{msg.date}</span> */}
                  </div>
                  <div className="messageContent">
                    <p>
                       Loading... 
                    </p>
                  </div>
                </>
            }

            {
              !isWaitingForResponse && 
                <>
                  <div className="messageInfo">
                    <img 
                      src={msg.isChatGPTResponse ? 
                            data.user.photoURL :
                            currentUser.photoURL 
                          } 
                      alt="" 
                      />
                    {/* <span>{msg.date}</span> */}
                  </div>


                  <div className="messageContent">
                    <p>
                          {parseTextWithUrls(msg.text)}
                    </p>
                  </div>
                </>
            }

          </div>

      }

    
    </>
  )
}

export default Message




