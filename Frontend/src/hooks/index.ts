import { useEffect, useState } from "react"
import axios from "axios";



export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
     console.log(id);
        axios.get( ` https://backend.saraswatdevesh98.workers.dev/api/v1/blog/${id}`)
            .then(response => {
                setBlog(response.data);
                setLoading(false);
                
            })
    }, [id])

    return {
        loading,
        blog
    }

}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get("https://backend.saraswatdevesh98.workers.dev/api/v1/blog/bulk")
            .then(response => {
                setBlogs(response.data);
                setLoading(false);
                console.log(response.data);
            })
    }, [])

    return {
        loading,
        blogs
    }
}