interface BoardHeaderProps {
    text: string;
    bg: string;
    count: number;
}

const BoardHeader = ({ text, bg, count }: BoardHeaderProps) => {
    return (
        <div className={`${bg} flex items-center justify-between h-12 px-4 rounded-md uppercase text-sm text-white`}>
            <span>{text}</span>
            <div className="bg-gray-50 text-green-500 rounded-full h-7 w-7 flex items-center justify-center">{count}</div>
        </div>
    )
}

export default BoardHeader