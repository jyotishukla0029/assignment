'use client'
import FormInput from "@/components/FormInput";
import TextInput from "@/components/TextInput";
import FormSelect, {Option} from "@/components/FormSelect";
import {CATEGORIES, Tag, TAGS} from "@/models/Category";
import FormSelection from "@/components/FormSelection";
import {FormEvent} from "react";
import {useChangeHandler} from "@/hooks/ChangeHandler";
import {Blog, BlogPayload} from "@/models/Blog";
import {useDispatch} from "react-redux";
import {addBlog} from "@/store/slices/blogsSlice";
import {AppDispatch} from "@/store";
import {v4} from "uuid";
import moment from "moment";
import ImageUpload from "@/components/ImageUpload";


export default function page() {
    const dispatch = useDispatch<AppDispatch>();
    const {payload, handleChange} = useChangeHandler<BlogPayload>({id: v4()});
    const onSubmit = (evt: FormEvent) => {
        evt.preventDefault();
        const blog: Blog = {...payload};
        if (payload.status === 'published') {
            blog.publishedDate = moment.now().toString()
        }
        if (payload.tagIds) {
            blog.tags = payload.tagIds.map<Tag|undefined>(tagId=> (TAGS.find(tag=> tag.id == tagId))).filter(tag=> !!tag)
        }
        blog.category = CATEGORIES.find(cat=> cat.id == payload.categoryId);
        console.log("Form Data: ", blog);
        dispatch(addBlog(blog));
    }
    return <div>
        <h1 className={`text-2xl mb-1`}>Create Blog</h1>
        <div className={`p-4 border rounded`}>
            <form onSubmit={onSubmit}>
                <FormInput label={"Title"} type={"Text"} name={"title"} onChange={handleChange} minLength={5} required/>
                <TextInput label={'Description'} name={'description'} onChange={handleChange} minLength={10} required/>
                <FormSelect label={'Category'} name={'categoryId'}
                            options={CATEGORIES.map<Option>(category => ({id: category.id, label: category.name}))}
                            onChange={handleChange} required/>
                <FormSelection label={'Status'} name={'status'} type={'radio'}
                               options={[{id: 1, label: "Published"}, {id: 2, label: "Draft"}]} onChange={handleChange}
                               required/>
                <FormSelection label={'Tags'} name={'tagIds'} type={'checkbox'}
                               options={TAGS.map<Option>(tag => ({id: tag.id, label: tag.name}))}
                               onChange={handleChange}/>
                <ImageUpload onImageChange={handleChange} name={`coverImage`} accept={"image/*"} />
                <button type={`submit`}>Add Blog</button>
            </form>
        </div>

    </div>;
}

