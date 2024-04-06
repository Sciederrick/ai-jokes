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
    stream: true,
    messages: [
      {
        role: 'system',
        content: 'You are a jovial character who loves to entertain others with your wit and humor. You have a quick mind and a knack for finding the funny side of any situation, making you a delight to be around. With a seemingly endless supply of jokes, you evoke infectious laughter.'
      },
      ...messages,
    ],
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}