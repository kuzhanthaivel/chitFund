import Logo from '../assets/logo.png'
import { Search } from 'lucide-react'

interface SerchbarProps {
    masterSearch: string;
    setMasterSearch: (value: string) => void;
    searchHandler: () => void;
}
export default function Serchbar({ masterSearch, setMasterSearch, searchHandler }: SerchbarProps) {
    return (<div className='flex flex-col w-full'>
        <div className="w-full h-28 flex flex-row items-center justify-start gap-9 p-4 pl-14 bg-[#F8FAFE]">
            <img className="w-40" src={Logo} alt="Trademarkia Logo" />
            <div className="flex flex-row w-auto space-x-3 justify-center items-center">
                <div className="flex p-2 bg-white border-[#D4D4D4] rounded-xl border-2 items-center gap-1 w-auto">
                    <Search size={20} />
                    <input
                        className="w-96 focus:border-transparent focus:outline-none focus:ring-0"
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setMasterSearch(e.target.value)}
                        value={masterSearch}
                    />
                </div>
                <button
                    className="flex text-white w-32 items-center justify-center p-4 bg-[#4380EC] rounded-xl"
                    type="button"
                    onClick={searchHandler}
                >
                    Search
                </button>
            </div>
        </div>
        <div className="bg-[#E7E6E6] h-0.5"></div>
    </div>

    )
}