
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import baseUri from "../utils/baseUri";
import { useAppSelector } from "../redux/hook";
import { toast } from "react-hot-toast";

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

interface Note {
    id: number;
    note_name: string;
    description: string;
    date: string;
}
export default function GridView() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const [notes, setNotes] = useState<Note[]>([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { addNotePopUp } = useAppSelector((state) => state.popUp);

    useEffect(() => {

            const fetchNoteData = async () => {
        try {
            const response = await fetch(`${baseUri}/api/note/viewNote`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const payload = await response.json().catch(() => null);

            if (!response.ok) {
                const msg = payload?.message || `Request failed (${response.status})`;

                if (response.status === 400) {
                    setError(msg);
                } else if (response.status === 401) {
                    setError("Session expired. Please log in.");
                    localStorage.removeItem("token");
                    toast.error("Session expired. Please log in.");
                    navigate("/login");
                } else if (response.status === 404) {
                    setError("No notes found.");
                    toast.error("No notes found.");
                    setNotes([]);
                } else if (response.status >= 500) {
                    setError("Server error. Please try again later.");
                    toast.error("Server error. Please try again later.");
                } else {
                    setError(msg);
                }
                return;
            }
            setNotes(Array.isArray(payload?.data) ? payload.data : []);
        } catch (error: any) {
            console.error("Error fetching notes:", error);
            setError(error.message || "An error occurred while fetching notes");
        } finally {
            setLoading(false);
        }
    };

        if (addNotePopUp) {
            fetchNoteData();
        }
        if (token) {
            fetchNoteData();
        } else {
            setError("Authentication required. Please log in.");
            toast.error("Authentication required. Please log in.");
            setLoading(false);
        }
    }, [token, addNotePopUp,navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">Loading notes...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[50vh] text-red-500 p-4 text-center">
                <p className="text-lg font-medium">Error loading notes</p>
                <p className="text-sm text-gray-600 mt-2">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <main className="bg-white text-black py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {notes.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No notes found. Create your first note to get started.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                        {notes.map((item) => (
                            <div
                                key={item.id}
                                className="group border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white border-gray-200 cursor-pointer transform hover:-translate-y-1"
                                onClick={() => navigate(`/transaction/${item.id}`)}
                            >
                                <div className="p-5">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 text-2xl font-bold">
                                            {item.note_name.charAt(0).toUpperCase()}
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-sm text-gray-500 mb-1">
                                            {formatDate(item.date)}
                                        </p>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                                            {item.note_name}
                                        </h3>
                                        {item.description && (
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-center">
                                    <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                                        View Details →
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}