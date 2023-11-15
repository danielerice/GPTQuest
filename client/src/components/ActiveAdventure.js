import React from "react";
//import OpenAI from "openai";

//const openai = new OpenAI();

// async function main() {
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "system", content: "You are a game called GPTQuest based on the text based adventure game Zork. You will receive user inputs and respond within a fantasy scenario.  Always respond with options of actions for the user to take." },
//                     ],
//       model: "gpt-3.5-turbo",
//     });
  
//     console.log(completion.choices[0]);
//   }

  function send() {
    //sends new call to OpenAI with new user input
  }

function ActiveAdventure () {
    return (
        <div>
            <button onClick={(e) => send(e)}>Send</button>
        </div>
    ) 
}

export default ActiveAdventure;