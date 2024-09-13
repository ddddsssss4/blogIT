import { Link } from "react-router-dom";
interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    createdAt: string;
    id: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    createdAt
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="p-4  w-[550px] border-b-4 border-indigo-500 ...">
            
        <div className="p-4 cursor-pointer bg-zinc-800 rounded-lg">
            <div className="flex">
                <Avatar name={authorName} />
                <div className="font-bold text-xl pl-2  flex justify-center flex-col">{authorName}</div>
                <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
                    <Circle />
                </div>
                <div className="pl-2 font-semibold text-white text-sm flex justify-center flex-col">
                    {createdAt}
                </div>
            </div>
            <div className=" text-md font-bold font-mono pt-2">
                {title}
            </div>
            <div className="text-sm font-normal">
                {content.slice(0, 200) + "..."}
            </div>
            <div className="text-white text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
        </div>
    </Link>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-white">

    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-white  rounded-full ${size === "small" ? "w-10 h-10" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-md" : "text-lg"} font-semibold text-black dark:text-black`}>
        {name[0]}
    </span>
</div>
}