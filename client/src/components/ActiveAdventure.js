import React, {useState} from "react";
import OpenAI from "openai";



function ActiveAdventure () {

  //state based vars
  const [responses, setResponses] = useState([]);
  const [currResponse, setCurrResponse] = useState(-1);
  const [resText, setResText] = useState("")

  //openai call functions
  const openai = new OpenAI({ apiKey: "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", dangerouslyAllowBrowser: true });

  //asynchronously call API with context
  async function fuckOpenAi() {
    // const completion = await openai.chat.completions.create({
    //   messages: [{ role: "system", content: "You are a game called GPTQuest based on the text based adventure game Zork. You will receive user inputs and respond within a fantasy scenario.  Always respond with 3 options of actions for the user to take." }],
    //   model: "gpt-3.5-turbo",
    // });



    // console.log(completion.choices[0]);
    // const updatedResponses = responses
    // updatedResponses.push(completion.choices[0].message.content)
    // setResponses(updatedResponses)
    // setCurrResponse(currResponse => currResponse + 1)

    //create assistant
    const assistant = await openai.beta.assistants.create({
      name: "GPTQuest",
      instructions: "You are a game called GPTQuest based on the text based adventure game Zork. You will receive user inputs and respond within a fantasy scenario.  Always respond with 3 options of actions for the user to take.",
      model: "gpt-4-1106-preview"
    });

    console.log(assistant)
  }

  //fires onClick
  function send() {
    //sends new call to OpenAI with new user input
    fuckOpenAi()
  }


    return (
        <div className="center aligned container" style={{marginTop: "8vh"}}>
          <div className="col">
            <h1>What will you do..?</h1>
            <p>{responses[currResponse]}</p>
            <input type="text" placeholder="what do you do?" id="resText" name="resText" required minLength="0" maxLength="180" size="10" onChange={(e) => setResText(e.target.value)}/>
            <button onClick={(e) => send(e)}>Send</button>
          </div>  
        </div>
    ) 
}

export default ActiveAdventure;