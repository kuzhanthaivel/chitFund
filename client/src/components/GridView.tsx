
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const dummyEventData = [
    {
        id: 1,
        Date: "15 Mar 2023",
        NoteName: "Crowdfunding Event",
        Discribtion: " the event is goodklajhsgkdfjhfj' AIU AIHU IH NSIHUYHB JNXIU  INJCH UH JOUBH ijb N NIBJ JIHB J Hoaoekihiokdplajncm m opiofokplk djojbam so jv jo ",
    },
    {
        id: 2,
        Date: "20 Feb 2024",
        NoteName: "Marrage Event",
        Discribtion: " the event is goodklajhsgkdfjhfj' AIU AIHU IH NSIHUYHB JNXIU  INJCH UH JOUBH ijb N NIBJ JIHB J Hoaoekihiokdplajncm m opiofokplk djojbam so jv jo ",
    },
    {
        id: 3,
        Date: "10 Jan 2024",
        NoteName: "Wedding Event",
        Discribtion: " the event is goodklajhsgkdfjhfj' AIU AIHU IH NSIHUYHB JNXIU  INJCH UH JOUBH ijb N NIBJ JIHB J Hoaoekihiokdplajncm m opiofokplk djojbam so jv jo ",
    },
    {
        id: 4,
        Date: "05 Dec 2023",
        NoteName: "Birthday Event",
        Discribtion: " the event is goodklajhsgkdfjhfj' AIU AIHU IH NSIHUYHB JNXIU  INJCH UH JOUBH ijb N NIBJ JIHB J Hoaoekihiokdplajncm m opiofokplk djojbam so jv jo ",
    },
    {
        id: 5,
        Date: "30 Mar 2024",
        NoteName: "Anniversary Event",
        Discribtion: " the event is goodklajhsgkdfjhfj' AIU AIHU IH NSIHUYHB JNXIU  INJCH UH JOUBH ijb N NIBJ JIHB J Hoaoekihiokdplajncm m opiofokplk djojbam so jv jo ",
    },
    {
        id: 6,
        Date: "18 Nov 2023",
        NoteName: "Marriage Event",
        Discribtion: " the event is goodklajhsgkdfjhfj' AIU AIHU IH NSIHUYHB JNXIU  INJCH UH JOUBH ijb N NIBJ JIHB J Hoaoekihiokdplajncm m opiofokplk djojbam so jv jo ",
    }
];


export default function GridView() {
    const [loading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [notes, setNotes] = useState<any>([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchNoteData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/note/viewNote", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setNotes(data.notes);
            } catch (error : any) {
                setError(error.message || "An error occurred while fetching notes");
            }
        }
        fetchNoteData();
    }, []);

    return (
        <main className={`bg-white text-black`}>
            <div className="px-2">
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
                            <>
                                <div className="grid grid-cols-6 gap-4 px-6 w-full mx-auto scale-95">
                                    {notes.map((item : any) => (
                                        <div key={item.id} className="w-full border rounded-lg shadow-md p-4 bg-white border-[#E7E6E6] hover:shadow-lg transition-shadow hover:scale-105 cursor-pointer " onClick={()=>{navigate(`/transaction/${item.id}`)}}>
                                            <div className="flex flex-row items-center justify-center">
                                                <div className="w-40 h-28 bg-indigo-50 flex items-center justify-center text-center rounded-lg">
                                                    <p className="text-2xl font-semibold">
                                                        {item.NoteName.charAt(0).toUpperCase()}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-row justify-between mt-4 gap-2">
                                                <div className="gap-1">
                                                    <p className="text-gray-600 text-sm">
                                                        <span className="font-semibold text-[#4380EC]">
                                                            {formatDate(item.Date)}
                                                        </span> 
                                                    </p>
                                                    <h2 className="text-lg font-bold line-clamp-1">{item.NoteName}</h2>
                                                    <p className="text-gray-700 text-base line-clamp-2">{item.Discribtion}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}