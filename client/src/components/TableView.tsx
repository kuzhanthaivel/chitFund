"use client"
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import baseUri from "../utils/baseUri";
import { useAppSelector } from "../redux/hook";
import { useNavigate } from "react-router-dom";
export default function TableView({ chit_note_id }: { chit_note_id: string }) {
    const [loading, setLoading] = useState(true);
    const [error] = useState(null);
    const { addTransactionPopUp } = useAppSelector((state) => state.popUp);
    const token = localStorage.getItem("token");
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
            const fetchTransactions = async () => {
        try {
            const response = await fetch(
                `${baseUri}/api/transaction/viewTransaction/${chit_note_id}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const payload = await response.json().catch(() => null);

            if (!response.ok) {
                const msg = payload?.message || `Request failed (${response.status})`;

                if (response.status === 400) {
                    toast.error(msg);
                    setLoading(false);
                } else if (response.status === 401) {
                    toast.error("Session expired. Please log in.");
                    localStorage.removeItem("token");
                    navigate("/login");
                } else if (response.status === 404) {
                    toast.error("Chit note not found or access denied");
                    setTransactions([]);
                    setLoading(false);
                } else if (response.status >= 500) {
                    toast.error("Server error. Please try again later.");
                    setLoading(false);
                } else {
                    toast.error(msg);
                    setLoading(false);
                }
                return;
            }

            setTransactions(Array.isArray(payload?.data) ? payload.data : []);
        } catch (error: any) {
            console.error("Error fetching transactions:", error);
            toast.error(error.message || "Failed to fetch transactions");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
        if (addTransactionPopUp) {
            fetchTransactions();
        }
        if (token) {
            fetchTransactions();
        } else {
            toast.error("Authentication required. Please log in.");
            setLoading(false);
        }
    }, [token, addTransactionPopUp, navigate, chit_note_id]);
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    return (
        <main className={`bg-white text-black`}>
            <div className="px-6">
                <div className="flex flex-row gap-6">
                    <div className="flex-1">
                        {loading ? (
                            <div className="w-full mx-auto bg-white p-4 rounded-lg scale-95 flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                <span className="ml-3 text-gray-600">Loading data...</span>
                            </div>
                        ) : error ? (
                            <div className="w-full mx-auto bg-white p-4 rounded-lg scale-95 flex flex-col justify-center items-center h-64 text-red-500">
                                <p className="text-lg font-medium">Error loading data</p>
                                <p className="text-sm text-gray-600 mt-1">{error || "Please try again later"}</p>
                            </div>
                        ) : (
                            <div className="w-full bg-white p-4 rounded-lg ">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S No</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt No</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {transactions.map((item: any) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.receipt_no}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.amount.toLocaleString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.total_amount.toLocaleString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{item.total.toLocaleString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(item.date)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}