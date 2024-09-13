import React, { useState } from 'react';
import { Appbar } from '../components/Appbar';
import { BlogCard } from '../components/BlogCard';
import { BlogSkeleton } from '../components/BlogSkeleton';
import { useBlogs } from '../hooks';
import { RecentCard } from '../components/RecentCard';
import { Link, Element } from 'react-scroll';

export const Blogs: React.FC = () => {
    const { loading, blogs } = useBlogs();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const blogsPerPage = 5;

    if (loading) {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center">
                    <div>
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    // Filter blogs based on search term if searchTerm is not empty
    const filteredBlogs = searchTerm
        ? blogs.filter(blog =>
              blog.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : blogs;

    const reversedFilteredBlogs = filteredBlogs.slice().reverse();

    // Extract recent posts separately (do not filter)
    const recentPosts = blogs.slice().reverse().slice(0, 3);

    // Pagination logic
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = reversedFilteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const totalPages = Math.ceil(reversedFilteredBlogs.length / blogsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const categories = ['Technology', 'Travel', 'Food', 'Fashion', 'Health'];

    return (
        <div>
            <Appbar />
            <div className="flex justify-between">
                <div>
                    <div className="bg-zinc-800 w-[560px] p-4 ml-8 mb-4 rounded-xl overflow-auto h-[855px] custom-scrollbar">
                        <div className="flex flex-col text-white pt-4 items-center">
                            <div className="w-screen max-w-md rounded-xl p-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-4">
                                        <Link to="recentPosts" smooth={true} duration={500} className="cursor-pointer font-bold font-mono">For you</Link>
                                        <Link to="categories" smooth={true} duration={500} className="cursor-pointer font-bold font-mono">Categories</Link>
                                    </div>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="bg-black text-white p-2 rounded-md"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {filteredBlogs.length > 0 ? (
                                currentBlogs.map(blog => (
                                    <BlogCard
                                        key={blog.id}
                                        id={blog.id}
                                        authorName={blog.author.name}
                                        title={blog.title}
                                        content={blog.content}
                                        createdAt={blog.createdAt.slice(0, 10)}
                                    />
                                ))
                            ) : (
                                <p className="text-white">No blogs found.</p>
                            )}
                            <div className="flex justify-center mt-4">
                                <button
                                    className="bg-gray-700 text-white px-4 py-2 rounded-l-md"
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        className={`bg-gray-700 text-white px-4 py-2 ${
                                            currentPage === index + 1 ? 'bg-gray-900' : ''
                                        }`}
                                        onClick={() => paginate(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    className="bg-gray-700 text-white px-4 py-2 rounded-r-md"
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                    <Element name="categories" className="bg-zinc-800 w-[560px] p-4 ml-8 mb-4 rounded-xl overflow-auto h-[275px] mt-8">
                        <div className="text-white font-bold font-mono text-xl pt-4 pl-2">Categories</div>
                        <div className="p-4 text-white">
                            {categories.map((category, index) => (
                                <div key={index} className="mb-2">
                                    <button className="text-white px-2 py-1 rounded-md font-normal">
                                        {category}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Element>
                </div>
                <div className="flex flex-col">
                    <Element name="recentPosts" className="bg-zinc-800 h-[410px] w-screen max-w-[580px] p-4 pr-2 mr-8 rounded-xl overflow-auto custom-scrollbar">
                        <div className="text-white font-bold font-mono text-xl underline decoration-sky-500">Recent Posts</div>
                        {recentPosts.map(blog => (
                            <RecentCard
                                key={blog.id}
                                id={blog.id}
                                title={blog.title}
                                publishedDate={(blog.createdAt).slice(0, 10)}
                            />
                        ))}
                    </Element>
                    <Element name="statistics" className="bg-zinc-800 h-[410px] w-screen max-w-[580px] mt-8 pr-2 mr-8 rounded-xl text-white font-bold font-mono text-xl pl-2 overflow-auto custom-scrollbar">
                        <div className="text-white font-bold font-mono text-xl pl-2 pt-4">Website Statistics</div>
                        <div className="grid grid-cols-2 grid-rows-2 pt-6 p-4 gap-4">
                            <div className="bg-gray-200 h-[150px] w-[250px]">1</div>
                            <div className="bg-gray-200 h-[150px] w-[250px]">2</div>
                            <div className="bg-gray-200 h-[150px] w-[250px]">3</div>
                            <div className="bg-gray-200 h-[150px] w-[250px]">4</div>
                        </div>
                    </Element>
                    <Element name="aboutUs" className="bg-zinc-800 h-[275px] w-screen max-w-[580px] mt-8 pr-2 mr-8 rounded-xl text-white font-bold font-mono text-xl pl-2 overflow-auto custom-scrollbar">
                        <div className="text-white font-bold font-mono text-xl pl-2 pt-4">About Us</div>
                        <div className="p-2 text-white font-light text-base">
                            Welcome to our blog! We are a team of passionate writers and creators who love to share our insights and experiences on a variety of topics. From web development to travel and lifestyle, we cover it all.
                        </div>
                        <div className="text-white font-bold font-mono text-xl pl-2 pt-4">Contact Us</div>
                        <div className="p-2 text-white font-light text-base">
                            Have a question or feedback? Feel free to reach out to us at <span className='text-red-600'>saraswatdevesh98@gmail.com</span>
                        </div>
                    </Element>
                </div>
            </div>
        </div>
    );
};
