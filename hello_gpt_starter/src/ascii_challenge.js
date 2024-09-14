import { ask, say } from "./shared/cli.ts";
import { promptGPT } from "./shared/openai.ts";

say("Pick a character to keep in mind. Let me guess who are you thinking!");
let tries = 0;
let dataDictionary = {};
let askedQues = [];
async function akinator(){
    let questionsString = '';
    if(askedQues != null){
        questionsString = await promptGPT(
            `We are playing a game where you guess what character am I thinking.
             Give me 4 yes or no questions to answer. 
             Exclude the questions that are in this array, ${askedQues}.
             Provide the  questions as a javascript array of strings like this:["question 1", "question 2", "question 3", "question 4"] 
             Include only the array, start with [ and end with ].`, { max_tokens: 1024, temperature: 0.3 });
            

    }else{
     questionsString= await promptGPT(
    `We are playing a game where you guess what character am I thinking.
     Give me 4 yes or no questions to answer. Provide the  questions as a javascript array of strings like this:["question 1", "question 2", "question 3", "question 4"] Include only the array, start with [ and end with ].`, { max_tokens: 1024, temperature: 0.3 });
    }
    

let questions = [];
let confidences = [];
    try {
    questions = JSON.parse(questionsString);
    } catch (_e) {
        say(`Error parsing questions string: "${questionsString}"`);
        return;
    } 

for (const q of questions){
    const a = await ask(q);

    if(a.toLowerCase() == "yes"){
        confidences.push(100);
    }else if (a.toLowerCase() == "maybe"){
        confidences.push(50);
    }else if (a.toLowerCase() == "i don't know"){
        confidences.push(25);
    }else if(a.toLowerCase() == "no"){
        confidences.push(0);
    }
    askedQues.push(q);
} 
for(let i = 0; i < questions.length; i++){
    for (let j = 0; j < confidences.length; j++ ){
        dataDictionary[`${questions[i]}`] = `${confidences[j]}`;
    }
}
const response = await promptGPT(`
    Give me a one word guess.
    The guess is based off of this javascript dictionary, ${JSON.stringify(dataDictionary)}. 
    The key were the questions that was asked.
    The values are corresponding confidence levels of answering 'yes' to each questions.
    It would look like this: {"Is the character from a movie?" : "50", "Is the character from a comic?" : "0"}.
    This means there is a 50 percent confidence that the character is from a movie, and there is a 0 percent level of confidence that the character is from a comic book.
 
    `,{ max_tokens: 84, temperature: 0.3 })
//const response = JSON.stringify(dataDictionary);
say(response);

const user = await ask("Is this right? yes/no");

if(user.toLowerCase() == "yes"){
    say("Yay!!");
}else{
    if(tries < 4){
        tries++;
        akinator();
    }else{
        say("sorry I can't guess it");
    }
    
}
}

akinator();
//    ${confidences[0]} percent confidence for a 'yes' as the answer to question: ${questions[0]},
//     ${confidences[1]} percent confidence for a 'yes' as the answer to question: ${questions[1]},
//     ${confidences[2]} percent confidence for a 'yes' as the answer to question: ${questions[2]},
//     ${confidences[3]} percent confidence for a 'yes' as the answer to question: ${questions[3]},  