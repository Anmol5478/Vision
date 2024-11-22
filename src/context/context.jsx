import { createContext, useState } from "react";
import runChat from "../../src/config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    const delayPara = (words) => {
        setResultData(''); // Clear previous result data before appending new words
        words.forEach((word, index) => {
            setTimeout(() => {
                setResultData((prev) => prev + word + ' ');
            }, 75 * index);
        });
    };
    const newChat=()=>{
        setLoading(false)
        setShowResult(false)
    }
    const onSent = async (prompt) => {
        const userPrompt = prompt || input; // Use the passed prompt or the current input
        if (!userPrompt.trim()) return; // Prevent empty submissions
    
        setLoading(true);
        setShowResult(true);
    
        try {
            // Add prompt to history and set it as recent
            setPreviousPrompt((prev) => [...prev, userPrompt]);
            setRecentPrompt(userPrompt);
    
            // Clear the resultData before displaying new results
            setResultData('');
    
            // Send the prompt to the API
            const response = await runChat(userPrompt);
    
            // Format response for bold and line breaks
            const formattedResponse = response
                .split("**")
                .map((part, i) => (i % 2 === 1 ? `<b>${part}</b>` : part))
                .join('')
                .split('*')
                .join('<br>');
    
            // Split response into words for delayed rendering
            const wordsArray = formattedResponse.split(' ');
    
            // Update state with word-by-word delayed output
            delayPara(wordsArray);
        } catch (error) {
            console.error("Error in onSent:", error);
        } finally {
            setLoading(false);
            setInput(''); // Clear input field
        }
    };
    

    const ContextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
