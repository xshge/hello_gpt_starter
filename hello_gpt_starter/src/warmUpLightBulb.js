import { ask, say } from "./shared/cli.ts";
import { promptGPT } from "./shared/openai.ts";

const subject = await ask("What do you want the joke to be about?");

const prompt = `Create a lightbulb joke about this ${subject} `;

const response = await promptGPT(prompt, {temperature: 1.5});

say(response);

