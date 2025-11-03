import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { useAppDispatch } from './redux/hook'
import { setAddNotePopUp } from './redux/popUpSlice'
import { useAppSelector } from './redux/hook'
import SideMenuBar from './components/SideMenuBar'
import ViewMechanisham from './components/GridView'
import Serchbar from './components/serchbar'
import AddNotePopUp from './components/AddNotePopUp'
import { Toaster } from 'react-hot-toast'
export default function Event() {
  const dispatch = useAppDispatch();
  const { sideBarOpen } = useAppSelector((state) => state.popUp);
  const [masterSearch, setMasterSearch] = useState("");
  return (
    <div className='relative min-h-screen flex'>
      <Toaster position="top-right" reverseOrder={false} />
      <SideMenuBar />
      <div className={`flex-1 transition-all duration-300 ${sideBarOpen ? 'ml-64' : 'ml-20'}`}>
        <div>
          <div className='flex justify-between items-center mb-6'>
            <Serchbar masterSearch={masterSearch} setMasterSearch={setMasterSearch} searchHandler={()=>{}} />
          </div>
          <ViewMechanisham />
        </div>
        <div className='fixed right-10 bottom-10 bg-indigo-700 text-gray-200 rounded-full w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-indigo-600 transition-colors'>
          <Plus onClick={() => dispatch(setAddNotePopUp(true))} />
        </div>
      </div>
      <AddNotePopUp />
    </div>
  )
}
