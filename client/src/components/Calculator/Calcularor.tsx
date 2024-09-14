import React, { useState } from 'react';

const Calculator: React.FC = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleButtonClick = (value: string) => {
        setInput((prev) => prev + value);
    };

    const clear = () => {
        setInput('');
        setResult('');
    };

    const calculate = () => {
        try {
            const calculatedResult = eval(input); 
            setResult(calculatedResult.toString());
        } catch {
            setResult('Error');
        }
    };

    return (
        <div className=" flex items-center justify-center mt-20">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
                <div className="text-3xl mb-4 text-right p-2 border border-gray-300 rounded-md">
                    {result || input || '0'}
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {['7', '8', '9', '/'].map((val) => (
                        <button
                            key={val}
                            onClick={() => handleButtonClick(val)}
                            className="bg-gray-200 p-4 text-xl rounded-md shadow hover:bg-gray-300"
                        >
                            {val}
                        </button>
                    ))}
                    {['4', '5', '6', '*'].map((val) => (
                        <button
                            key={val}
                            onClick={() => handleButtonClick(val)}
                            className="bg-gray-200 p-4 text-xl rounded-md shadow hover:bg-gray-300"
                        >
                            {val}
                        </button>
                    ))}
                    {['1', '2', '3', '-'].map((val) => (
                        <button
                            key={val}
                            onClick={() => handleButtonClick(val)}
                            className="bg-gray-200 p-4 text-xl rounded-md shadow hover:bg-gray-300"
                        >
                            {val}
                        </button>
                    ))}
                    {['0', '.', '=', '+'].map((val) => (
                        <button
                            key={val}
                            onClick={val === '=' ? calculate : () => handleButtonClick(val)}
                            className={`${val === '='
                                    ? 'bg-violet-600 text-white'
                                    : 'bg-gray-200 text-xl'
                                } p-4 rounded-md shadow hover:bg-gray-300 focus:bg-none`}
                        >
                            {val}
                        </button>
                    ))}
                </div>
                <button
                    onClick={clear}
                    className="bg-violet-800 w-full p-4 mt-4 text-white text-xl rounded-md shadow hover:bg-red-600"
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default Calculator;
