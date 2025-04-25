import ConversationSection from './ConversationSection';
import Input from './Input'

const Home = () => {
    return (
        <div className='w-full h-full  flex items-center justify-center '>
            <Input />
            <ConversationSection/>
        </div>
    )
}

export default Home