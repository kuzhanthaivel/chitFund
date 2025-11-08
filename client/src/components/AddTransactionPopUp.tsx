import Button from "./Button";
import Input from "./Input";
import { useAppDispatch } from "../redux/hook";
import { setAddTransactionPopUp } from "../redux/popUpSlice";
import { X } from "lucide-react";
import { useAppSelector } from "../redux/hook";
import { useState } from "react";
import { toast } from "react-hot-toast";
import baseUri from "../utils/baseUri";
import { useNavigate } from "react-router-dom";

const AddTransactionPopUp = ({ chit_note_id }: { chit_note_id: string }) => {
    const dispatch = useAppDispatch();
    const { addTransactionPopUp } = useAppSelector((state) => state.popUp);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Date: "",
        ReceiptNo: "",
        Amount: "",
        TotalAmount: "",
        Total: "",
    })

const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!formData.Date || !formData.ReceiptNo || !formData.Amount || !formData.TotalAmount || !formData.Total) {
    toast.error("All fields are required");
    return;
  }

  try {
    const requestData = {
      date: formData.Date,
      receipt_no: formData.ReceiptNo,
      amount: Number(formData.Amount),
      total_amount: Number(formData.TotalAmount),
      total: Number(formData.Total),
    };

    const response = await fetch(`${baseUri}/api/transaction/addTransaction/${chit_note_id}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      const msg = payload?.message || `Request failed (${response.status})`;

      if (response.status === 400) {
        toast.error(msg);
      } else if (response.status === 401) {
        toast.error("Session expired. Please log in.");
        localStorage.removeItem("token");
        navigate("/login");
      } else if (response.status === 404) {
        toast.error("Chit note not found or access denied");
      } else if (response.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(msg);
      }
      return;
    }

    toast.success(payload?.message ?? "Transaction added successfully");
    dispatch(setAddTransactionPopUp(false));

    setFormData({
      Date: "",
      ReceiptNo: "",
      Amount: "",
      TotalAmount: "",
      Total: "",
    });
  } catch (error: any) {
    console.error("Error:", error);
    toast.error(error.message || "Failed to add transaction");
  }
};
    return (
        <div>
            {addTransactionPopUp && (<div className='fixed inset-0  bg-opacity-20 z-30 backdrop-blur-sm min-h-screen flex items-center justify-center bg-gray-100'>
                <div className='relative flex flex-col  justify-center items-center border-2 border-gray-200 rounded-lg  w-96 bg-gray-300 text-gray-200 p-5'>
                    <button className='absolute top-2 right-2 hover:text-gray-800 cursor-pointer hover:bg-gray-200 p-1 rounded-full' onClick={() => dispatch(setAddTransactionPopUp(false))}> <X size={20} /> </button>
                    <div className='flex flex-col justify-between items-center mb-6'>
                        <h3 className='text-lg font-semibold text-black'>Add Transaction</h3>
                    </div>
                    <form onSubmit={handleUpload} className='w-full'>
                        <div className='mb-6'>
                            <Input label="Date" type="date" value={formData.Date} onChange={(e) => setFormData({ ...formData, Date: e.target.value })} />
                        </div>
                        <div className='mb-6'>
                            <Input label="Receipt No" type="number" value={formData.ReceiptNo} onChange={(e) => setFormData({ ...formData, ReceiptNo: e.target.value })} />
                        </div>
                        <div className='mb-6'>
                            <Input label="Amount" type="number" value={formData.Amount} onChange={(e) => setFormData({ ...formData, Amount: e.target.value })} />
                        </div>
                        <div className='mb-6'>
                            <Input label="Total Amount" type="number" value={formData.TotalAmount} onChange={(e) => setFormData({ ...formData, TotalAmount: e.target.value })} />
                        </div>
                        <div className='mb-6'>
                            <Input label="Total" type="number" value={formData.Total} onChange={(e) => setFormData({ ...formData, Total: e.target.value })} />
                        </div>
                        <Button text='Submit' type='submit' onClick={() => { }} />
                    </form>
                </div>
            </div>)}
        </div>
    );
};
export default AddTransactionPopUp;
