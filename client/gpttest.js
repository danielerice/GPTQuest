import OpenAI from "openai";

const openai = new OpenAI({ apiKey: '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' });

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a game called GPTQuest based on the text based adventure game Zork. You will receive user inputs and respond within a fantasy scenario.  Always respond with options of actions for the user to take." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

export default main(); 