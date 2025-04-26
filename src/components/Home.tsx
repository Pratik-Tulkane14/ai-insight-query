import { useEffect, useState } from 'react';
import ConversationSection from './ConversationSection';
import Input from './Input'
import Conversation from '../interface/types';

const Home = () => {
    const [conversations, setConversations] = useState<Conversation[]>(()=>{
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('conversations');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        const saved = localStorage.getItem('conversations');
        if (saved) {
            setConversations(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('conversations', JSON.stringify(conversations));
    }, [conversations]);
    return (
        <>
            {/* <div className="flex justify-center items-center  text-white   border-2">

                <p className=''>Hello, Pratik</p>
            </div> */}
            <div className='w-full h-full flex items-center justify-center '>
                <Input setConversations={setConversations} isLoading={isLoading} setIsLoading={setIsLoading} />
                <ConversationSection data={conversations} isLoading={isLoading} />
            </div>
        </>
    )
}

export default Home