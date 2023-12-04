import React, {useContext, useState, useEffect} from "react";
import OpenAI from "openai";
import { AdventureContext } from "../contexts/AdventureContext";


function ActiveAdventure () {




  //Current Adventure pulled from Adventure Context
  const {adventure} = useContext(AdventureContext);


  //state based vars
  const [currResponse, setCurrResponse] = useState(null);
  const [resText, setResText] = useState("")
  //array of objs for api, updated when user submits new prompts
  const [contextArray, setContextArray] = useState([
    {
      "role": "system",
      "content": "You are a game called GPTQuest based on the text based adventure game Zork. You will receive user inputs and respond within a fantasy scenario.  Always respond by first setting the scene and them present the user with 3 options of actions for the user to take."
    },
    {
      "role": "user",
      "content": adventure.prompt
    },
    {
      "role" : "user",
      "content": `Start with an item called ${adventure.items[0].title}. It's ${adventure.items[0].context[0]}`
    }
  ])


  //fires onClick
  async function send() {

    //get key
    const keyResponse = await fetch('/creds')
    const key = await keyResponse.json()

    //get vars
    const openai = new OpenAI({ apiKey: key.secret_access_key, dangerouslyAllowBrowser: true });
    
    setCurrResponse(null)

    //sends new call to OpenAI with new user input
    let sendContext = contextArray
    sendContext.push({
      "content": resText,
      "role": "user"
    })
    setContextArray(sendContext)

    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: sendContext,
      temperature: 1,
      max_tokens: 4069,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    setCurrResponse(response.choices[0].message.content)
    let updatedContext = sendContext
    updatedContext.push({
      "content": response.choices[0].message.content,
      "role": "assistant"
    })
    setContextArray(updatedContext)
  }

  //fires inital call and sets the first response to set the scene
  useEffect(() => {

    //asynchronously call API with context
    async function callOpenAi() {

      //get key
      const keyResponse = await fetch('/creds')
      const key = await keyResponse.json()
    
  
      //get vars
      const openai = new OpenAI({ apiKey: key.secret_access_key, dangerouslyAllowBrowser: true });
  
      //chat init
      const response = await openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        messages: contextArray,
        temperature: 1,
        max_tokens: 4069,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      setCurrResponse(response.choices[0].message.content)
      let updatedContext = contextArray
      updatedContext.push({
        "content": response.choices[0].message.content,
        "role": "assistant"
      })
      setContextArray(updatedContext)
    }
    callOpenAi()
  }, [])

  const style = { width: "7rem", height: "7rem" }


    return (
        <div className="container align-content-center" style={{marginTop: "8vh"}}>
          <div className="col">
            <h1>{adventure.title}</h1>
            { currResponse ? <p>{currResponse}</p> : <div className="d-flex justify-content-center"><div className="spinner-border" role="status" style={style}><span className="visually-hidden">Loading...</span></div></div>}
            <input className="form-control" type="text" placeholder="what will you do?" id="resText" name="resText" required minLength="0" maxLength="180" size="10" onChange={(e) => setResText(e.target.value)}/>
            <button onClick={(e) => send(e)}>Send</button>
          </div>  
        </div>
    )
}

export default ActiveAdventure;