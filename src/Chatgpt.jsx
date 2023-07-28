

import React, { useState } from 'react'
import axios from 'axios';

const Chatgpt = () => {
    const [prompt , setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const HTTP = "http://localhost:8081/chat";

    const hadleSubmit =(e) => {
        e.preventDefault();
        axios.post(`${HTTP}` , {prompt})
        .then((res)=>{
          console.log(res)
          setResponse(res.data);
          // console.log(res.data)
        })
        .catch((err)=>{console.log(err)})
    }

  return (
    <div>
        <form onSubmit={hadleSubmit}>
        <input
            type='text'
            value={prompt}
            placeholder='enter your question'
            onChange={(e)=>{setPrompt(e.target.value)}}
        />
        </form>
        <h1>response you will get below</h1>

        <p>{response}</p> 
    </div>
  )
}

export default Chatgpt






// import React, { useState } from 'react'
// import axios from 'axios';

// const Chatgpt = () => {
//     const [prompt , setPrompt] = useState('');
//     const [response, setResponse] = useState('');

//     const HTTP = "http://localhost:8081/chat";

//     const hadleSubmit =(e) => {
//         e.preventDefault();
//         axios.post(`${HTTP}` , {prompt})
//         .then((res)=>{
//           console.log(res)
//           setResponse(res.data);
//           // console.log(res.data)
//         })
//         .catch((err)=>{console.log(err)})
//     }

//   return (
//     <div>
//         <form onSubmit={hadleSubmit}>
//         <input
//             type='text'
//             value={prompt}
//             placeholder='enter your question'
//             onChange={(e)=>{setPrompt(e.target.value)}}
//         />
//         </form>
//         <h1>response you will get below</h1>

//         <p>{response}</p> 
//     </div>
//   )
// }

// export default Chatgpt







// {/* <form onSubmit={hadleSubmit}>
//             <input
//                 type='text'
//                 value={prompt}
//                 placeholder='enter your question'
//                 onChange={(e)=>{setPrompt(e.target.value)}}
//             />

//             <input type="sumbit">click</input>
//         </form>

//         <h1>response you will get below</h1>

//         <p>{response}</p> */}









// import React, { useState } from "react";
// import axios from "axios";

// export default function Chatgpt() {
//   const [prompt, setPrompt] = useState("");
//   const [response, setResponse] = useState("");
//   const HTTP = "http://localhost:8081/chat";

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios
//       .post(`${HTTP}`, { prompt })
//       .then((res) => {
//         setResponse(res.data);
//         console.log(prompt);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     setPrompt("");
//   };

//   const handlePrompt = (e) => {
//     setPrompt(e.target.value);
//   };

//   return (
//     <div className="container container-sm p-1">
//       <h1 className="title text-center text-darkGreen">ChatGPT API</h1>
//       <form className="form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="">Ask questions</label>
//           <input
//             className="shadow-sm"
//             type="text"
//             placeholder="Enter text"
//             value={prompt}
//             onChange={handlePrompt}
//           />
//         </div>{" "}
//         {/* <button className="btn btn-accept w-100" type="submit">
//           Go
//         </button> */}
//       </form>
//       <div className="bg-darkGreen  mt-2 p-1 border-5">
//         <p className="text-light">
//           {response ? response : "Ask me anything..."}
//         </p>
//       </div>
//     </div>
//   );
// }