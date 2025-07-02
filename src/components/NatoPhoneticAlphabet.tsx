'use client';

import { useState } from 'react';

const natoPhoneticAlphabet: { [key: string]: string } = {
  'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
  'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliett',
  'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar',
  'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
  'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee',
  'Z': 'Zulu',
};

export default function NatoPhoneticAlphabet() {
  const [text, setText] = useState('');
  const [phoneticText, setPhoneticText] = useState('');

  const convertToPhonetic = (inputText: string) => {
    let result = '';
    for (const char of inputText.toUpperCase()) {
      if (natoPhoneticAlphabet[char]) {
        result += natoPhoneticAlphabet[char] + ' ';
      } else if (char === ' ') {
        result += ' ';
      } else {
        result += char;
      }
    }
    setPhoneticText(result.trim());
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    convertToPhonetic(newText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(phoneticText);
  };

  const clearText = () => {
    setText('');
    setPhoneticText('');
  };

  return (
    <div className="flex flex-col h-screen justify-between p-4 bg-gradient-to-b from-[#B22222] to-[#20C2C2]">
      
      <div className="w-full max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold text-white bg-red-500/50 rounded-lg p-2">
          ONLINE NATO PHONETIC ALPHABET
        </h1>
      </div>

      <div className="w-full max-w-md mx-auto flex-grow flex flex-col justify-center">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 h-3/4 flex items-center justify-center relative">
            <p className="text-white text-center text-2xl">{phoneticText}</p>
            {phoneticText && (
                <button 
                    onClick={copyToClipboard}
                    className="absolute bottom-4 right-4 bg-gray-800/50 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700/50"
                >
                    COPY
                </button>
            )}
        </div>
      </div>

      <div className="w-full max-w-md mx-auto relative">
        <textarea
          className="w-full h-32 bg-black/20 backdrop-blur-sm border-2 border-white/30 rounded-lg text-white p-4 text-lg focus:outline-none focus:ring-2 focus:ring-white/50 pr-12"
          placeholder="Enter text to convert"
          value={text}
          onChange={handleTextChange}
        />
        {text && (
          <button 
            onClick={clearText}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800/50 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-700/50"
          >
            X
          </button>
        )}
      </div>

      <div className="w-full max-w-md mx-auto text-center mt-4">
        <p className="text-white font-bold">VIBE CODED WITH GEMINI CLI</p>
      </div>

    </div>
  );
}