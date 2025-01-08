import {Blog} from "@/models/Blog";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import {removeBlog} from "@/store/slices/blogsSlice";

export const BlogCard = ({blog}: {blog: Blog}) => {
    const dispatch = useDispatch<AppDispatch>();
    return <div className={`flex border mb-3`}>
        {blog.coverImage&&
            <div style={{maxWidth: '120px', overflow: 'hidden', maxHeight: '100%'}}><img src={blog.coverImage} style={{width: '100%', height: '100%', objectFit: 'cover'}}/></div>}
        <div key={blog.id} className={`p-3`}>
            <div className={'flex justify-between'}><h2 className={`font-bold`}>{blog.title}</h2>
                <span className={'text-red-500'} onClick={() => {
                    dispatch(removeBlog(blog.id))
                }}>X</span>
            </div>
            <p>{blog.description}</p>
            <div className={`flex items-center mt-2`}><span
                className={`text-xs font-bold text-gray-500 m-0 p-0`}>◉ {blog.category?.name}:</span> <span
                className={`ms-2 `}/> {blog.tags?.map(tag => <span key={tag.id}
                                                                   className={`text-xs m-0 p-0 text-gray-400 me-1 `}
                                                                   style={{textDecoration: 'underline'}}>{tag.name}</span>)}
            </div>
        </div>
    </div>
}