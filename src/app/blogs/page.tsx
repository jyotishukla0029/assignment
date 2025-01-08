'use client'
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {BlogCard} from "@/components/BlogCard";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function page() {
    const path = usePathname();
    const blogs = useSelector((state: RootState)=> state.blogsState.blogs)
    return <div className={`flex flex-col`}>
        <div className={`flex justify-between mb-2`}>
            <h1>Blogs</h1>
            <Link href={`${path}/add`} className={`self-start btn`}>+ Create a blog</Link>
        </div>
        {blogs.map(blog=> (<BlogCard blog={blog} key={blog.id} />))}
    </div>
}