"use client"
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function TableView({ chit_note_id }: { chit_note_id: string }) {
    const [loading] = useState(false);
    const [error] = useState(null);
    const token = localStorage.getItem("token");
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/transaction/viewTransaction/${chit_note_id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message || 'Failed to fetch transactions');
                }
                setTransactions(result.data);
            } catch (error: any) {
                console.error('Error fetching transactions:', error);
                toast.error(error.message || "Failed to fetch transactions");
            }
        };
        fetchTransactions();
    }, [chit_note_id, token]);
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