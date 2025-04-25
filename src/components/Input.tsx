import { useEffect, useRef, useState } from 'react';
import { FaPlus, FaRegCircleStop } from 'react-icons/fa6';
import { IoMdSend } from "react-icons/io";
import generateContentFromGemini from '../services/generateContentFromGemini';

interface Conversation {
    user?: string | File,
    gemini?: string
}

interface InputProps {
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean
}

const Input: React.FC<InputProps> = ({ setConversations, isLoading, setIsLoading }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [input, setInput] = useState<string | File>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (typeof input === "string" && !input.trim()) return
        const userInput = input;
        setInput("");
        setIsLoading(true);
        setConversations((prev) => [...prev, { user: userInput }]);

        try {
            const result = await generateContentFromGemini(userInput);
            setConversations((prev: Conversation[]) => [...prev, { gemini: result }]);
        } catch (error) {
            console.error("Error generating content:", error);
            setConversations((prev) => [...prev, { gemini: "Sorry, something went wrong" }]);
        } finally {
            setIsLoading(false);
        }
    }
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setInput(files[0])
            console.log('Selected file:', files[0]);
            await generateContentFromGemini(files[0]);
            // Handle the file upload here
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const newHeight = Math.min(textareaRef.current.scrollHeight, 200);
            textareaRef.current.style.height = `${newHeight}px`;
        }
    }, [input]);

    return (
        <div className="flex flex-col justify-center items-center z-50 fixed bottom-0 pb-3 w-full  min-h-[50px] max-h-auto bg-[#121212]">
            <div className="w-[90vw] md:w-[50%] flex items-center rounded-2xl border-1">
                <form className='w-full flex gap-2 items-center justify-center px-2 py-2' onSubmit={handleSubmit}>
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        spellCheck={false}
                        placeholder='Ask to AI-Insight-Query...'
                        className='w-[95%] min-h-[44px] max-h-[200px] transition-all outline-none px-4 py-2 resize-none rounded-lg text-white text-sm '
                        value={typeof input === 'string' ? input : ''}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                    />
                    <div className="relative">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*,.pdf,.doc,.docx"
                        />
                        <button
                            type="button"
                            className="flex items-center justify-center p-2 rounded-full  text-white  transition-colors"
                        >
                            <FaPlus className="h-5 w-5" />
                        </button>
                    </div>

                    <button
                        type='submit'
                        className='cursor-pointer p-2 rounded-full hover:bg-[#333] transition-colors disabled:cursor-not-allowed disabled:bg-transparent'
                        disabled={isLoading || !input}
                    >
                        {isLoading ?
                            <FaRegCircleStop className='h-6 w-6 text-gray-400' /> :
                            <IoMdSend className='h-6 w-6 text-white' />
                        }
                    </button>
                </form>
            </div>
            <p className='text-white text-nowrap text-xs font-light mt-2'>
                AI Insight Query can make mistakes, so double-check it
            </p>
        </div>
    );
}

export default Input;