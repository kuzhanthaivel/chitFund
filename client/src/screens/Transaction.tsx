import { Plus } from 'lucide-react'
import { useAppDispatch } from '../redux/hook'
import { setAddTransactionPopUp } from '../redux/popUpSlice'
import { useAppSelector } from '../redux/hook'
import SideMenuBar from '../components/SideMenuBar'
import ViewMechanisham from '../components/TableView'
import AddTransactionPopUp from '../components/AddTransactionPopUp'
import { useParams } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
export default function Transaction() {
  const dispatch = useAppDispatch();
  const { sideBarOpen } = useAppSelector((state) => state.popUp);
  const { id } = useParams();
  return (
    <div className='relative min-h-screen flex mt-14'>
      <Toaster position="top-right" reverseOrder={false} />
      <SideMenuBar />
      <div className={`flex-1 transition-all duration-300 ${sideBarOpen ? 'ml-64' : 'ml-20'}`}>
        <div>
          <ViewMechanisham chit_note_id={String(id)} />
        </div>
        <div className='fixed right-10 bottom-10 bg-indigo-700 text-gray-200 rounded-full w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-indigo-600 transition-colors'>
          <Plus onClick={() => dispatch(setAddTransactionPopUp(true))} />
        </div>
      </div>
      <AddTransactionPopUp chit_note_id={String(id)} />
    </div>
  )
}
