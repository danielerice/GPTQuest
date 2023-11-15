import OpenAI from "openai";

const openai = new OpenAI({ apiKey: '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' });

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a game called GPTQuest based on the text based adventure game Zork. You will receive user inputs and respond within a fantasy scenario.  Always respond with options of actions for the user to take." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main(); 