'use client'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import {useState} from "react";
import {removeBlog} from "@/store/slices/blogsSlice";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

export const BlogDetail = ({blogId}: {blogId: string}) => {
    const blog = useSelector((state: RootState)=> state.blogsState.blogs.find(blog=> blog.id == blogId))
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const handleDelete = () => {
        dispatch(removeBlog(blogId));
        toast.success("Blog removed successfully!");
        setShowDeleteDialog(false);
    };

    return blog? <div>
        <h1 className={`font-bold text-2xl`}>{blog?.title}</h1>
        <p>{blog?.description}</p>

        <div className="mt-4 flex space-x-4">
            <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={()=>setShowDeleteDialog(true)}
            >
                Delete
            </button>
            <button
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
                onClick={()=>router.back()}
            >
                Go Back
            </button>
        </div>
        <ConfirmationDialog
            show={showDeleteDialog}
            title="Delete"
            subtitle="Are you sure you want to delete this blog?"
            removeButtonText="Remove"
            onRemoveClick={handleDelete}
            onCloseClick={() => setShowDeleteDialog(false)}
            className=" w-[320px] h-[250px]"
        />

    </div> : <div>Blog not found</div>
}