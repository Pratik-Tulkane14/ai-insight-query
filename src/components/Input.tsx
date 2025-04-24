import { useState } from 'react'
import { FaRegCircleStop } from 'react-icons/fa6';
import { IoMdSend } from "react-icons/io";
import generateContentFromGemini from '../services/generateContentFromGemini';
const Input = () => {
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const result = await generateContentFromGemini(input);
        setInput("")
        console.log(result);

    }
    return (
        <>
            <div className="flex flex-col justify-center items-center fixed bottom-0 pb-5 w-full sm:h-28 h-32 bg-[#121212]">
                <div className=" w-[90vw] md:w-[50%] h-14 sm:h-28  flex items-center rounded-2xl border-1 ">
                    <form className='w-full flex gap-2 items-center justify-center px-2 py-2 ' onSubmit={(e) => handleSubmit(e)}>
                        <input type="text" placeholder='Ask to AI-Insight-Query...' className='w-[95%] h-full outline-none px-2' value={input} onChange={(e) => setInput(e.target.value)} />
                        <button type='submit' className='cursor-pointer '>
                            {isLoading ?
                                <FaRegCircleStop /> :
                                <IoMdSend className='h-6 w-6' />
                            }
                        </button>
                    </form>
                </div>
                <p className='text-white text-nowrap text-xs font-light mt-2'>AI Insight Query can make mistakes, so double-check it</p>
            </div>
        </>
    )
}

export default Input