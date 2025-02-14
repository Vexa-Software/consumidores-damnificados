
import { FaRegCalendarAlt } from "react-icons/fa";

interface NewsCardProps {
    title: string;
    description: string;
    date: string;
    imagen?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, date, imagen }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg w-[300px] 2xl:w-80 min-h-[350px] max-h-[500px] flex flex-col justify-self-center overflow-hidden">

            {imagen && (
                <div className="h-40 w-full">
                    <img
                        src={imagen}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

          
            <div className="p-4 flex flex-col flex-grow h-56">
                <div className="flex flex-col flex-grow h-24">
                    <h1 className="font-bold text-lg text-start text-gray-900">{title}</h1>

                 
                    <p className="text-gray-600 text-sm mt-4 break-words line-clamp-4 overflow-hidden whitespace-normal text-ellipsis w-full leading-snug">
                        {description}
                    </p>
                </div>

                
                <div className="flex justify-end items-center text-gray-500 text-xs mt-4">
                    <div className="flex items-center gap-1">
                        <FaRegCalendarAlt />
                        <span>{date}</span>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default NewsCard;
