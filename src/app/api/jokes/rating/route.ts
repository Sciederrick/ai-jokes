import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'http://127.0.0.1:5000/v1'
});
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { messages } = await req.json();
 
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: false,
    messages: [
      {
        role: 'system',
        content: `You are a jovial character who loves jokes. 
        Based on the jokes given by the user, judge them based on the following criteria:
            - is the joke funny or not
            - is the joke appropriate or not ()
            - is the joke offensive or not
        Give a one phrase response for each criterion mentioned above i.e:
            - Funny or not funny
            - Appropriate or not appropriate
            - Offensive or not offensive
        Add a matching symbol next to each category to stress the message.
        `
      },
      ...messages,
    ],
  });  
 
  return Response.json(response)

}