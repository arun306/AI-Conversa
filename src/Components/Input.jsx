import React, { useContext, useState } from 'react'
import Img from "../img/img.png"
import Attach from "../img/attach.png"
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid} from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import axios from 'axios';
// import { LoadingContext } from '../context/LoadingContext';


const Input = () => {

  const [text,setText]  = useState("");
  const [img,setImg]  = useState(null);



  const {currentUser} = useContext(AuthContext); //current user
  const {data} = useContext(ChatContext) //other user

  // const {setIsWaitingForResponse} = useContext(LoadingContext)

  

  const handleSend = async () =>{
    if(img){

      const storageRef = ref(storage, uuid());
      
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {

              await updateDoc(doc(db,"chats",data.chatId), {
                messages: arrayUnion({
                  id : uuid(),
                  text,
                  senderId : currentUser.uid,
                  data : Date.now(),
                  img: downloadURL
                })
              });
            });
        }
      );

    } else {

      if(text !== "")
      {
        if(!data.flag){

          await updateDoc(doc(db,"chats",data.chatId), {
            messages: arrayUnion({
              id : uuid(),
              text,
              senderId : currentUser.uid,
              date : Timestamp.now()
            })
          });

        }else{
          
          // setIsWaitingForResponse(true);

          
          await updateDoc(doc(db,"AIchats",data.chatId),{
            messages: arrayUnion({
              id : uuid(),
              text,
              senderId : currentUser.uid,
              date : Timestamp.now(),
              isChatGPTResponse : false
            })
          })
          

          
          try{

            const {Configuration,OpenAIApi} = require('openai');
            const Config = new Configuration({
              apiKey : process.env.REACT_APP_API_KEY
          })

          const openai = new OpenAIApi(Config);
          
          const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages : [{role: "user", content : text} ]
          })
          
          await updateDoc(doc(db,"AIchats",data.chatId),{
            messages: arrayUnion({
              id : uuid(),
              text : completion.data.choices[0].message.content,
              senderId : currentUser.uid,
              date : Timestamp.now(),
              isChatGPTResponse : true
            })
          })
        }catch(e){
          console.log(e.message);
        }
          
          
          // getting response from chatGPT api
          // const HTTP = "http://localhost:8081/chat";
          // axios.post(`${HTTP}` , {text})
          // .then(async (res)=>{
          //   // alert(res.data);
          //   // console.log(res.data)
          //   await updateDoc(doc(db,"AIchats",data.chatId),{
          //     messages: arrayUnion({
          //       id : uuid(),
          //       text : res.data,
          //       senderId : currentUser.uid,
          //       date : Timestamp.now(),
          //       isChatGPTResponse : true
          //     })
          //   })
          // })
          // .catch((err)=>{
          //   // setIsWaitingForResponse(false);
          //   console.log(err)
          // })
          
          // setIsWaitingForResponse(false);

        }

      }

    }

  
    if(text !== ""){  
      if(!data.flag){

        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [data.chatId + ".lastMessage"] : {
            text
          },
          [data.chatId+".date"] : serverTimestamp()
        });
        
        await updateDoc(doc(db,"userChats",data.user.uid),{
          [data.chatId + ".lastMessage"] : {
            text
          },
          [data.chatId+".date"] : serverTimestamp()
        });
      }
    }

    setText("");
    setImg(null);
  }


  


  const handleKeyPress = (e) => {
    if(e.key === "Enter"){
      handleSend();
    }
  }

  return (
    <div className='input'>
      <input 
        value={text}
        type="text" 
        placeholder='Type something...'
        onChange={(e)=>setText(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <div className="send">
        <img src={Attach} alt="" />
        <input 
          // value={img}
          type="file" 
          style={{display:"none"}} 
          id="file" 
          onChange={(e)=>setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}> &gt;&gt; </button>
      </div>

    </div>
  )
}

export default Input
