import React, { useState } from 'react'
import Add from "../img/addAvatar.png";
import {auth,db,storage} from "../firebase"
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';
import LoadingOverlay from '../Annimations/LoadingOverlay';

const Register = () => {
    const [err,setErr] = useState(false)
    const navigate = useNavigate();

    const [isLoading,setIsLoading] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true);

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        


        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)
            

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on
            (
                'state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default : console.log("default");

                    }
                }, 
                (error) => {
                    // Handle unsuccessful uploads
                }, 
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {

                        
                        // updating the user profile which is created by the auth 
                        await updateProfile(res.user,{
                            displayName,
                            photoURL: downloadURL
                        });
                        

                        // setting new document in the firebase firestore database with the following fields
                        await setDoc(doc(db,'users',res.user.uid),{
                            uid : res.user.uid,
                            displayName,
                            email,
                            photoURL : downloadURL,
                        });
                        

                        // creating a new doc in database for storing the userChats
                        setIsLoading(false);
                        await setDoc(doc(db,'userChats',res.user.uid),{});
                        // await set


                        // navigating to home page !
                        navigate("/")

                    });
                }
            );

        }catch(err){
            setErr(true);
        }

    }


    return (
        <>
            {
                isLoading ? (<LoadingOverlay />) : 
                (
                    <div className="formContainer">
                        <div className="formWrapper">
                            <span className="logo">AI-Conversa</span>
                            <span className="title">Register</span>

                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder='User Name'/>
                                <input type="email" placeholder='email'/>
                                <input type="password" placeholder='password'/>
                                <input style={{display:'none'}} type='file' id='file' />
                                <label htmlFor="file">
                                    <img src={Add} alt="img" />
                                    <span>Add an avatar</span>
                                </label>
                                <button>
                                {
                                    isLoading ? <div className="loader"></div> : "Sign up" 
                                }
                                </button>
                                {err &&
                                    <span style={{color:"red"}}>something went wrong</span>
                                }
                            </form>
                            <p>Have an accouunt? <Link to='/login'>Login</Link></p>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Register
