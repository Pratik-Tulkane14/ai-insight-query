import { useEffect, useRef } from 'react';
import MarkdownUi from './MarkdownUi';
import chatLogo from "/chatLogo.png";
interface ConversationSectionProps {
    data: { id?: string; user?: string|File; gemini?: string }[],
    isLoading: boolean
}
const ConversationSection: React.FC<ConversationSectionProps> = ({ data, isLoading }) => {
    const messageEndRef = useRef<HTMLDivElement>(null);
    const handleScrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    useEffect(() => {
        if (messageEndRef.current) {
            handleScrollToBottom();
        }
    }, [data])
    return (
        <div className='flex flex-col relative w-full px-2 md:w-[50%] my-28'>
            {data.map((item, index) => {
                return (
                    <div key={index} >
                        {item.user &&
                            <div className="flex justify-end  w-full ">
                                    {typeof item.user === 'string' && (
                                        <p className=' bg-[#404045] text-white p-4 mx-4 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl'>{item.user}</p>
                                    )}
                                </div>
                        }
                        {item.gemini &&
                            <div className="flex justify-start items-center max-w-[80%] mb-10 mt-10">
                                <div className="flex items-start">
                                    <img src={chatLogo} className='h-10 w-10' />
                                </div>
                                <MarkdownUi text={item.gemini} />
                            </div>
                        }
                    </div>
                )
            })}
            {isLoading &&
                <div className="flex justify-start max-w-[80%] mb-10 mt-10">
                    <p>Just a second...</p>
                </div>
            }
            <div ref={messageEndRef}></div>
        </div>
    )
}

export default ConversationSection