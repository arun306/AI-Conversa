

const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const Config = new Configuration({
  apiKey:"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",
});

const openai = new OpenAIApi(Config);

// Setup server

const app = express();
app.use(bodyParser.json());
app.use(cors());

// endpoint for ChatGPT
// app.post("/chat", async (req, res) => {
//   const { text } 
// })

app.post("/chat", async (req, res) => {
  // console.log(req)
  // console.log('| \n | \n | \n | \n | \n | \n | \n | \n | \n | \n | \n | \n ')
  // console.log(res)
  const { text } = req.body;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages : [{role: "user", content : text} ]
  })
  // Object.entries(completion.data.choices[0].message.content).forEach((k)=>{console.log(k)})

  res.send(completion.data.choices[0].message.content)

  // const completion = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   max_tokens: 1000,
  //   temperature: 0,
  //   prompt: prompt,
  // });
  // // console.log(JSON.stringify(completion));
  // Object.entries(completion.data.choices).forEach((k)=>{console.log(k)})
  // res.send(completion.data.choices[0].text);
});

const PORT = 8081

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
