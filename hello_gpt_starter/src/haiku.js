/**
 * This program prompts the user to enter their name and hometown
 * and uses theLLM to generate a limerick about the user.
 */

import { promptGPT } from "./shared/openai.ts";
import { ask, say } from "./shared/cli.ts";

// prompt user for name and hometown
const location = await ask("Where are you right now?");
const insight = await ask("What is on your mind?");

// output a blank line
say("");

// prepare the prompt and send to GPT
const prompt =
  `I'm currently at ${location} and I just had a revelation about ${insight}. Create a haiku about my current situation with these standards:
    the ${location} will be incorporate into the haiku through a description of it, the revelation about ${insight} needs to be detailed.`;

const haiku= await promptGPT(prompt, { temperature: 0.8 });

// output the limerick
say(haiku);
