import { Link } from "react-router-dom";
interface BlogCardProps {
  
    title: string;
    
    publishedDate: string;
    id: number;
}

export const RecentCard = ({
    id,
  
    title,
   
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="p-4  w-[550px] h-auto border-b-4 flex items-center border-indigo-500 ...">
            
        <div className="p-1 cursor-pointer bg-zinc-800 rounded-lg flex">
           <div className="bg-white h-[75px] w-[75px] rounded-lg">
           </div>
           <div>
            <div className="text-white  text-lg font-mono pl-4">{title}</div>
            <div className="text-white  font-thin  pl-4">{publishedDate}</div>
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
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-10 h-10" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-white dark:text-white`}>
        {name[0]}
    </span>
</div>
}