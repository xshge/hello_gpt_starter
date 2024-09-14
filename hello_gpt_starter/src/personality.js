import { ask, say } from "./shared/cli.ts";
import { promptGPT } from "./shared/openai.ts";

const response = await ask("What do you want to ask? ");

const result = await promptGPT(`Create a shor response that uses 30 completion_tokens or less, to this question: ${response} and with a personality of a gnome who would like ripp people off`, {
  temperature: 1.5,
});

say("");
say(result);
