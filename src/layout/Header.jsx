import ThemeSwitch from '@/components/ThemeSwitch';
import { Link } from 'react-router';


const Header = () => {
    return (
        <header className="w-full flex items-center justify-between gap-2 py-3 px-3 z-50">
        <Link to="/" className="font-[500]">Work Space</Link>
        <div className="flex justify-start items-center  text-neutral-200 md:justify-center gap-3">
        <ThemeSwitch/>
    </div>
      </header>
     
)}

export default Header
