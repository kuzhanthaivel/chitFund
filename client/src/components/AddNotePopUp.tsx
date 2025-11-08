import Button from "./Button";
import Input from "./Input";
import { useAppDispatch } from "../redux/hook";
import { setAddNotePopUp } from "../redux/popUpSlice";
import { X } from "lucide-react";
import { useAppSelector } from "../redux/hook";
import { useState } from "react";
import { toast } from "react-hot-toast";
import baseUri from "../utils/baseUri";

const AddNotePopUp = () => {
    const dispatch = useAppDispatch();
    const { addNotePopUp } = useAppSelector((state) => state.popUp);
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        noteName: "",
        date: "",
        description: "",
    })

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseUri}/api/note/addNote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    note_name: formData.noteName,
                    date: formData.date,
                    description: formData.description,
                })
            });
            const payload = await response.json();
            if (!response.ok) {
                const msg = payload?.message || `Request failed (${response.status})`;
                if (response.status === 400) {
                    toast.error(msg);
                } else if (response.status === 401) {
                    toast.error("Session expired. Please log in.");
                } else {
                    toast.error(msg);
                }
                return;
            }
            toast.success(payload?.message ?? "Note added successfully");
            dispatch(setAddNotePopUp(false));
        } catch (error) {
            toast.error("Failed to add note");
        }
    }

    return (
        <div>
            {addNotePopUp && (<div className='fixed inset-0  bg-opacity-20 z-30 backdrop-blur-sm min-h-screen flex items-center justify-center bg-gray-100'>
                <div className='relative flex flex-col  justify-center items-center border-2 border-gray-200 rounded-lg w-96 bg-gray-300 text-gray-200 p-5'>
                    <button className='absolute top-2 right-2 hover:text-gray-800 cursor-pointer hover:bg-gray-200 p-1 rounded-full' onClick={() => dispatch(setAddNotePopUp(false))}> <X size={20} /> </button>
                    <div className='flex flex-col justify-between items-center mb-6'>
                        <h3 className='text-lg font-semibold text-black'>Add Note</h3>
                    </div>
                    <form onSubmit={handleUpload} className='w-full'>
                        <div className='mb-6'>
                            <Input label="Note Name" type="text" value={formData.noteName} onChange={(e) => setFormData({ ...formData, noteName: e.target.value })} />
                        </div>

                        <div className='mb-6'>
                            <Input label="Date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                        </div>
                        <div className='mb-6'>
                            <Input label="Description" type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                        </div>
                        <Button text='Submit' type='submit' onClick={() => { }} />
                    </form>
                </div>
            </div>)}
        </div>
    );
};
export default AddNotePopUp;
