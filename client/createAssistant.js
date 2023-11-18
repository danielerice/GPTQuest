import OpenAI from "openai";

const openai = new OpenAI({ apiKey: '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' });

  //asynchronously call API with context
  async function createAssistant() {
    //create assistant
    const assistant = await openai.beta.assistants.create({
      name: "GPTQuest",
      instructions: "You are a game called GPTQuest based on the text based adventure game Zork. You will receive user inputs and respond within a fantasy scenario.  Always respond with 3 options of actions for the user to take.",
      model: "gpt-4-1106-preview"
    });

    console.log(assistant)
  }

  createAssistant()

export default createAssistant(); 