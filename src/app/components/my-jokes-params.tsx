import { useState } from "react";

const MyJokesParams = () => {
    const [topics] = useState(['Work', 'People', 'Food', 'Television', 'Satirical-humor']);
    const [jokeTypes] = useState(['Puns', 'One-lines', 'Observational-humor', ''])
    const [tones] = useState(['Witty', 'Sarcastic', 'Silly', 'Dark', 'Goofy'])
    const [temperatureValue, setTemperatureValue] = useState(0);

    const handleTemperatureChange = (e:any) => {
        setTemperatureValue(e.target.value);
    };

    return (
    <div className="px-4 py-12 md:py-24 lg:py-32">
      <div className="container mx-auto prose lg:prose-lg xl:prose-xl text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Generate Jokes with Shadcn</h1>
          <p className="text-gray-500 dark:text-gray-400">
            choose the topic, type, tone, and temperature to generate jokes using the Shadcn Joke API.
          </p>
        </div>
        <div className="flex flex-col gap-4 min-h-[400px] justify-center pt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <div className="space-y-2">
              <h3 className="underline">Topic</h3>
                <ul className="min-w-[200px] grid grid-cols-1 gap-4" id="topic">
                    {topics.map((topic, index) => (
                        <li className="params-select" key={index} value={topic.toLowerCase()}>{topic}</li>
                    ))}
                </ul>
            </div>
            <div className="space-y-2">
              <h3 className="underline">Type</h3>
              <ul className="min-w-[200px]" id="type">
                {jokeTypes.map((jokeType, index) => (
                    <li className="params-select" key={index} value={jokeType.toLowerCase()}>{jokeType}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="underline">Tone</h3>
              <ul className="min-w-[200px]" id="tone">
                {tones.map((tone, index) => (
                    <li className="params-select" key={index} value={tone.toLowerCase()}>{tone}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h3>Temperature</h3>
              <input id="temperature" max="1" min="0" placeholder="0.5" step="0.1" type="number" value={temperatureValue} onChange={handleTemperatureChange}/>
            </div>
          </div>
          <button>Generate Joke</button>
        </div>
      </div>
    </div>
    )
}

export default MyJokesParams;