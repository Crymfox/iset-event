import React from 'react';

interface CardProps {
    imageSrc: string;
    title: string;
    score?: number;
    onChangeFunction?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rank?: number;
    onBlurFunction?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onDeleteFunction?: () => void;
    final?: boolean;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, score, onChangeFunction, rank, onBlurFunction, onDeleteFunction, final }) => {
    // const [score, setScore] = useState(0);
    // const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setScore(Number(event.target.value));
    // }
    return (
        <div className={`flex items-center ${rank == 1 ? "bg-yellow-500/40" : rank == 2 ? "bg-gray-300/50" : rank == 3 ? "bg-amber-700/40" : rank! <= 8 ? "bg-green-300/50" : "bg-blue-500/50"} rounded-lg shadow-lg p-2 relative`}>
            <img src={imageSrc} alt={title} className="w-16 h-16 rounded-full mr-4" />
            <div className="flex">
                <h2 className="text-xl font-bold max-w-[12rem]">{title}</h2>
                {!final && <input
                    type="number"
                    value={score}
                    className="absolute right-[20%] top-[20%] w-24 h-8 mt-2 px-2 py-1 border text-4xl bg-inherit border-gray-300 rounded outline-none border-none font-bold text-red-800"
                    onChange={onChangeFunction}
                    onBlur={onBlurFunction}
                />}
            </div>
            {/* // the rank badge in the end of the card */}
            {!final && <div className={` absolute right-3 flex items-center justify-center text-gray-800 ${rank! > 3 ? "border-2 border-gray-800" : ""} px-2 rounded-full font-bold text-3xl`}>
                {
                    rank == 1 ? "🥇" : rank == 2 ? "🥈" : rank == 3 ? "🥉" : rank
                }
            </div>}
            {/* absolute button labeled "x" on the right top to delete the card that is visible only when you hover on it */}
            <button
                className="absolute top-0 right-0 p-1 hover:text-red-500 text-transparent"
                title="Delete"
                onClick={onDeleteFunction}
            >x</button>
        </div>
    );
};

export default Card;