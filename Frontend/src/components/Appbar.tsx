import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const Appbar = () => {
    return <div className="bg-zinc-800 mb-16"><div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer font-extrabold hover:font-bold text-white text-2xl">
            BlogIT
        </Link>
        <div>
        <div className="flex flex-row justify-end space-x-4">
        <div className=" text-white font-bold hover:font-extrabold font-mono  p-4">Home</div>
        <div className=" text-white font-bold hover:font-extrabold font-mono  p-4">Categories</div>
        <div className=" text-white font-bold hover:font-extrabold font-mono p-4">Contact</div>
        <div className=" text-white font-bold hover:font-extrabold font-mono p-4">About Us</div>

            <Avatar size={"big"} name="harkirat" />
        </div>
        </div>
    </div>
    </div>
}