"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const {
    messages,
    isLoading,
    append,
  } = useChat({ api: 'api/jokes/generator', onFinish(message) {
    console.log(message.content)
    rateTheJoke(message.content);
  } } );

  const [topics] = useState(['work', 'people', 'food', 'television', 'satirical-humor']);
  const [jokeTypes] = useState(['puns', 'one-liner', 'observational-humor'])
  const [tones] = useState(['witty', 'sarcastic', 'silly', 'dark', 'goofy'])

  const [temp, setTemp] = useState(0.5);
  const [topic, setTopic] = useState(topics[0]);
  const [jokeType, setJokeType] = useState(jokeTypes[0]);
  const [tone, setTone] = useState(tones[0]);
  const [jokeAnalysis, setJokeAnalysis] = useState<string|null>(null);

  const handleTemperatureChange = (e:any) => {
      setTemp(e.target.value);
  };

  const handleClickTopic = (choice: string) => {
    setTopic(choice);
  };

  const handleClickJokeType = (choice: string) => {
    setJokeType(choice);
  };

  const handleClickTone = (choice: string) => {
    setTone(choice);
  };

  const handleClickSubmit = () => {
    setJokeAnalysis(null);
    append({ role: "user", content: `Generate a ${tone} ${jokeType} joke based on ${topic}` }, { options: { body: {temperature: temp}}})
  }

  const rateTheJoke = async (joke: string) => {
    console.log(`joke: ${joke}`)
    const response = await fetch("api/jokes/rating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{
          role: 'user',
          content: joke
        }]
      }),
    });
    const data = await response.json();
    const rateJoke = data.choices[0].message.content;
    setJokeAnalysis(rateJoke)
  }

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  let [prevNumMsgs, setPrevNumMsgs]  = useState(messages.length);
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, jokeAnalysis]);

  return (
    <div className="flex flex-col w-full h-screen max-w-[768px] py-12 mx-auto stretch">
      <div className="p-4">
        <div className="container mx-auto prose lg:prose-lg xl:prose-xl text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Generate Jokes</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Choose the topic, type, tone, and temperature to generate jokes with AI.
            </p>
          </div>
          <div className="flex flex-col gap-4 min-h-[400px] justify-center pt-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <div className="space-y-2">
                <h3 className="underline">Topic</h3>
                  <ul className="params-container" id="topic">
                      {topics.map((mTopic, index) => (
                          <li 
                            onClick={() => handleClickTopic(mTopic)}
                            className={`params-select ${ mTopic === topic ? 'border-green-600' : '' }`}
                            key={index}>{mTopic}</li>
                      ))}
                  </ul>
              </div>
              <div className="space-y-2">
                <h3 className="underline">Type</h3>
                <ul className="params-container" id="type">
                  {jokeTypes.map((mJokeType, index) => (
                      <li 
                        onClick={() => handleClickJokeType(mJokeType)}
                        className={`params-select ${ mJokeType === jokeType ? 'border-green-600' : '' }`}
                        key={index}>{mJokeType}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="underline">Tone</h3>
                <ul className="params-container" id="tone">
                  {tones.map((mTone, index) => (
                      <li 
                        onClick={() => handleClickTone(mTone)}
                        className={`params-select ${ mTone === tone ? 'border-green-600' : '' }`}
                        key={index}>{mTone}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3>Temperature</h3>
                <input className="text-gray-900 px-3 rounded"
                  id="temperature" max="1" min="0" step="0.1" type="number" value={temp} onChange={handleTemperatureChange}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-auto mb-8 w-full" ref={messagesContainerRef}>
        {messages.map((m) => (
          <div
            key={m.id}
            className={`whitespace-pre-wrap ${
              m.role === "user"
                ? "bg-green-700 p-3 m-2 rounded-lg"
                : "bg-slate-700 p-3 m-2 rounded-lg"
            }`}
          >
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-end pr-4">
            <span className="animate-bounce">...</span>
          </div>
        )}
        {jokeAnalysis && (
          <div className="p-4 bg-yellow-900 m-2 rounded">
            {jokeAnalysis}
          </div>
        )}
      </div>
      <div className="fixed bottom-4 w-full max-w-[768px]">
        <div className="flex flex-col justify-center mb-2 items-center">
          <button
            className="bg-blue-500 p-2 text-white rounded shadow-xl"
            disabled={isLoading}
            onClick={handleClickSubmit}>
            Generate a joke
          </button>
        </div>
      </div>
    </div>
  );
}
