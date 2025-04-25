import Navbar from './Navbar'
import { ReactNode } from 'react';
interface LayoutProps {
    children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='relative w-full h-full'>
            <Navbar />
            <div className='relative '>
                {children}
            </div>
        </div>
    )
}

export default Layout