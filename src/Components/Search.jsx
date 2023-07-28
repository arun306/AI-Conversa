import React, { useContext, useState } from 'react'
import { getDoc,doc,collection,getDocs,query,setDoc,updateDoc,where, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Search = () => {
  const [username,setUserName] = useState("");
  const [user,setUser] = useState(null)   //search res user !
  const [err,setErr] = useState(false)

  // const {currUser} = useContext(AuthContext);  //curr user //fuckkkk
  const {currentUser} = useContext(AuthContext)

  const handleKey = e =>{
    e.code === "Enter" && handleSearch();
  }

  // const handleSelect = async () => {
  //   //  handle select .. response when we click the user we searched
  //   // check whether the group(chats in firestore) exist s, if not create
  //   console.log("clickd");




    
  //   // const combinedId = currUser.uid > user.uid ? currUser.uid + user.uid+"" : user.uid + currUser.uid+"";
  //   const combinedId = "xyz1234";
  //   try{
  //       const res = await getDoc(doc(db,"chats",combinedId));
  //       if(!res.exists()){
  //         // no user chat is done so create a chat in chats collection 
  //         await setDoc(doc(db,"chats",combinedId),{messages : [] });

  //         // updating the doc 

  //         await updateDoc(doc(db,"user-chats",currUser.uid),{
  //           [combinedId+".userInfo"] : {
  //             uid : user.uid,
  //             displayName : user.displayName,
  //             photoURL : user.photoURL
  //           },
  //           [combinedId+".date"] : serverTimestamp()
  //         })

  //         await updateDoc(doc(db,"user-chats",user.uid),{
  //           [combinedId+".userInfo"] : {
  //             uid : currUser.uid,
  //             displayName : currUser.displayName,
  //             photoURL : currUser.photoURL
  //           },
  //           [combinedId+".date"] : serverTimestamp()
  //         })

  //       }
  //     }catch (err) {

  //     } 
  //   // create userchats 

  // }



  const handleSearch = async () => {
    const q = query(
      collection(db,'users'),
      where('displayName','==',username)
    );

    try{
      const searchRes = await getDocs(q);
      searchRes.forEach((doc)=>{
        setUser(doc.data());
      });
    }catch(er){
      // console.log(er.code)
      // console.log(er.message)
      
      setErr(true);
    }
  }

  // const handleSelect = async () => {
  //   const combinedId = ""+user.uid + currUser.uid;
  //   try{
  //     const res = await getDoc(db,"chats",combinedId)
      
  //     if(!res.exists()){
  //       // create chat in chats collections 
  //       await setDoc(doc(db,"chats",combinedId),{messages : []});

  //       await updateDoc(doc(db,"chats",currUser.uid),{
  //         [combinedId+".userInfo"] : {
  //           uid : user.uid,
  //           displayName : user.displayName,
  //           photoURL : user.photoURL,
  //         },
  //         [combinedId+".date"] : serverTimestamp() 
  //       })
  //       await updateDoc(doc(db,"chats",user.uid),{
  //         [combinedId+".userInfo"] : {
  //           uid : currUser.uid,
  //           displayName : currUser.displayName,
  //           photoURL : currUser.photoURL,
  //         },
  //         [combinedId+".date"] : serverTimestamp() 
  //       })
  //     }

  //   }catch(err) {

  //   }
  // }


  
    const {dispatch} = useContext(ChatContext)

    const handleSelect = async (u) =>{
      // checkt whether the group exists or not ,if not create

      // create userchats 
      
      const combinedId = 
      currentUser.uid > user.uid ? 
      currentUser.uid + user.uid : 
      user.uid + currentUser.uid;

      try{
        const res = await getDoc(doc(db,'chats',combinedId));
        
        // exits is a firebase method !!
        if(!res.exists()){

          // create a chat in chats collection
          await setDoc(doc(db,'chats',combinedId),{messages : []})
          
          await updateDoc(doc(db,'userChats',currentUser.uid),{
            [combinedId+".userInfo"] : {
              uid : user.uid,
              displayName : user.displayName,
              photoURL : user.photoURL
            },
            [combinedId+".date"] : serverTimestamp(),
            // not writing last msg
          });

          await updateDoc(doc(db,'userChats',user.uid),{
            [combinedId+".userInfo"] : {
              uid : currentUser.uid,
              displayName : currentUser.displayName,
              photoURL : currentUser.photoURL
            },
            [combinedId+".date"] : serverTimestamp(),
            // not writing last msg
          });
        }
      }catch(err){

      }
      
      dispatch({type:"CHANGE_USER",payload : u})

      setUser(null);
      setUserName("");

    }
  


  return (
    <div className="search">
      <div className="searchForm">
        <input 
          type="text" 
          placeholder='Find a user' 
          onKeyDown={handleKey} 
          onChange={(e)=>setUserName(e.target.value)}
          value={username}
        />
      </div>
      {
        err && 
        <span> user not found !!</span>
      }
      {
        user &&
        <div className="userChat" onClick={()=>handleSelect(user)}>
          <img 
            src={user.photoURL} 
            alt="" 
          />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
            {/* <p>Hello</p> */}
          </div>
        </div>
      }
    </div>
  )
}

export default Search
