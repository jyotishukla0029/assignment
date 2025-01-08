import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {BlogDetail} from "@/components/BlogDetail";

export default async function Blog({params}: {
    params: Promise<{ id: string }>
}) {
    const {id} = (await params)
    return <BlogDetail blogId={id} />
}