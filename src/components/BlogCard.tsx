

import { Blog } from "@/models/Blog";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { removeBlog } from "@/store/slices/blogsSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {useEffect, useState} from "react";
import { toast } from "react-toastify";
import ConfirmationDialog from "@/components/ConfirmationDialog";

export const BlogCard = ({ blog }: { blog: Blog }) => {
    const dispatch = useDispatch<AppDispatch>();
    const path = usePathname();
    const [isFullDescription, setIsFullDescription] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const[blogId,setBlogId] = useState<string>('');


    const toggleDescription = () => {
        setIsFullDescription((prevState) => !prevState);
    };

    const handleDelete = (id: string) => {
        dispatch(removeBlog(id));
        toast.success("Blog removed successfully!");
        setShowDeleteDialog(false);
    };


    return (
        <div className="flex border mb-3">
            {blog.coverImage && (
                <div className="max-w-[120px] overflow-hidden max-h-full">
                    <img
                        src={blog.coverImage}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <div key={blog.id} className="p-3">
                <div className="flex justify-between">
                    <Link href={`${path}/${blog.id}`} className="font-bold">
                        {blog.title}
                    </Link>
                    <span
                        className="text-red-500 cursor-pointer"
                        onClick={() => {

                            setBlogId(blog.id);
                            setShowDeleteDialog(true)
                        }}
                    >
                        X
                    </span>
                </div>


                <p
                    className={`${
                        isFullDescription ? "" : "line-clamp-3"
                    } text-sm text-gray-600`}
                >
                    {blog.description}
                </p>


                {
                    //@ts-ignore

                    blog?.description?.length > 500 && !isFullDescription && (
                    <button
                        onClick={toggleDescription}
                        className="text-white text-sm mt-2"
                    >
                        Read more
                    </button>
                )}
                {isFullDescription && (
                    <button
                        onClick={toggleDescription}
                        className="text-white text-sm mt-2"
                    >
                        Show less
                    </button>
                )}

                <div className="flex items-center mt-2">
                    <span className="text-xs font-bold text-gray-500">
                        ◉ {blog.category?.name}:
                    </span>
                    <span className="ms-2 " />
                    {blog.tags?.map((tag) => (
                        <span
                            key={tag.id}
                            className="text-xs text-gray-400 mr-1 underline"
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>


            <ConfirmationDialog
                show={showDeleteDialog}
                title="Delete"
                subtitle="Are you sure you want to delete this blog?"
                removeButtonText="Remove"
                onRemoveClick={()=>handleDelete(blogId)}
                onCloseClick={() => setShowDeleteDialog(false)}
                className=" w-[320px] h-[250px]"
            />
        </div>
    );
};
