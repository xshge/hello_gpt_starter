import { promptGPT } from "./shared/openai.ts";
import { ask, say } from "./shared/cli.ts";

const text = await ask("what you want to be translated?");
const language = await ask("what language?");

const response = await promptGPT(`Simply translate this: ${text} into ${language}`, {temperature: 0.5});

say(response);