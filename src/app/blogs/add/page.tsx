// 'use client'
// import FormInput from "@/components/FormInput";
// import TextInput from "@/components/TextInput";
// import FormSelect, {Option} from "@/components/FormSelect";
// import {CATEGORIES, Tag, TAGS} from "@/models/Category";
// import FormSelection from "@/components/FormSelection";
// import {FormEvent} from "react";
// import {useChangeHandler} from "@/hooks/ChangeHandler";
// import {Blog, BlogPayload} from "@/models/Blog";
// import {useDispatch} from "react-redux";
// import {addBlog} from "@/store/slices/blogsSlice";
// import {AppDispatch} from "@/store";
// import {v4} from "uuid";
// import moment from "moment";
// import ImageUpload from "@/components/ImageUpload";
//
//
// export default function page() {
//     const dispatch = useDispatch<AppDispatch>();
//     const {payload, handleChange} = useChangeHandler<BlogPayload>({id: v4()});
//     const onSubmit = (evt: FormEvent) => {
//         evt.preventDefault();
//         const blog: Blog = {...payload};
//         if (payload.status === 'published') {
//             blog.publishedDate = moment.now().toString()
//         }
//         if (payload.tagIds) {
//             blog.tags = payload.tagIds.map<Tag|undefined>(tagId=> (TAGS.find(tag=> tag.id == tagId))).filter(tag=> !!tag)
//         }
//         blog.category = CATEGORIES.find(cat=> cat.id == payload.categoryId);
//         console.log("Form Data: ", blog);
//         dispatch(addBlog(blog));
//     }
//     return <div>
//         <h1 className={`text-2xl mb-1`}>Create Blog</h1>
//         <div className={`p-4 border rounded`}>
//             <form onSubmit={onSubmit}>
//                 <FormInput label={"Title"} type={"Text"} name={"title"} onChange={handleChange} minLength={5} required/>
//                 <TextInput label={'Description'} name={'description'} onChange={handleChange} minLength={10} required/>
//                 <FormSelect label={'Category'} name={'categoryId'}
//                             options={CATEGORIES.map<Option>(category => ({id: category.id, label: category.name}))}
//                             onChange={handleChange} required/>
//                 <FormSelection label={'Status'} name={'status'} type={'radio'}
//                                options={[{id: 1, label: "Published"}, {id: 2, label: "Draft"}]} onChange={handleChange}
//                                required/>
//                 <FormSelection label={'Tags'} name={'tagIds'} type={'checkbox'}
//                                options={TAGS.map<Option>(tag => ({id: tag.id, label: tag.name}))}
//                                onChange={handleChange}/>
//                 <ImageUpload onImageChange={handleChange} name={`coverImage`} accept={"image/*"} />
//                 <button type={`submit`} className={'mt-4'}>Add Blog</button>
//             </form>
//         </div>
//
//     </div>;
// }




'use client'

import FormInput from "@/components/FormInput";
import TextInput from "@/components/TextInput";
import FormSelect, { Option } from "@/components/FormSelect";
import { CATEGORIES, Tag, TAGS } from "@/models/Category";
import FormSelection from "@/components/FormSelection";
import { Blog, BlogPayload } from "@/models/Blog";
import { useDispatch } from "react-redux";
import { addBlog } from "@/store/slices/blogsSlice";
import { AppDispatch } from "@/store";
import { v4 } from "uuid";
import moment from "moment";
import ImageUpload from "@/components/ImageUpload";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import {useRouter} from "next/navigation";
import {useChangeHandler} from "@/hooks/ChangeHandler";

const validationSchema = Yup.object({
    title: Yup.string().min(5, "Title must be at least 5 characters").required("Title is required"),
    description: Yup.string().min(40, "Description must be at least 40 characters").required("Description is required"),
    categoryId: Yup.string().required("Category is required"),
    status: Yup.string().required("Status is required"),
    tagIds: Yup.array().of(Yup.string()).required("At least one tag is required"),
});

export default function Page() {
    const dispatch = useDispatch<AppDispatch>();
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const router = useRouter();
// const {handleChange} = useChangeHandler({id: v4()});


    const formik = useFormik({
        initialValues: {
            id: v4(),
            title: '',
            description: '',
            categoryId: '',
            status: '',
            publishedDate: '',
            tagIds: [],
            coverImage: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //@ts-ignore
            const blog: Blog = { ...values };

            if (values.status === 'published') {
                blog.publishedDate = moment.now().toString();
                // setShowPicker(true);
            }

            if (values.tagIds) {
                blog.tags = values.tagIds.map<Tag | undefined>((tagId) => TAGS.find(tag => tag.id == tagId)).filter(tag => !!tag);
            }

            //@ts-ignore
            blog.category = CATEGORIES.find(cat => cat.id == values.categoryId);

            console.log("Form Data: ", blog);

            dispatch(addBlog(blog));

            toast.success("Blog added successfully!");
            router.push('/blogs')
        },
    });

    useEffect(() => {
        console.log("ffff",showPicker)
        if (formik.values.status === 'published') {
            setShowPicker(true);
        } else {
            setShowPicker(false);
        }
    }, [formik.values.status]);


    const handleImageChange = (file: File) => {
        console.log("File selected:", file);
        formik.setFieldValue("coverImage", file);
    };
    return (
        <div>
            <h1 className="text-2xl mb-1">Create Blog</h1>
            <div className="p-4 border rounded">
                <form onSubmit={formik.handleSubmit}>
                    <FormInput
                        label="Title"
                        type="text"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        //@ts-ignore
                        onBlur={formik.handleBlur}
                        minLength={5}
                    />
                    {formik.touched.title && formik.errors.title && <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>}

                    <TextInput
                        label="Description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        //@ts-ignore
                        onBlur={formik.handleBlur}
                        minLength={10}
                    />
                    {formik.touched.description && formik.errors.description && <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>}

                    <FormSelect
                        label="Category"
                        name="categoryId"
                        options={CATEGORIES.map<Option>(category => ({ id: category.id, label: category.name }))}
                        value={formik.values.categoryId}
                        onChange={formik.handleChange}
                        //@ts-ignore
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.categoryId && formik.errors.categoryId && <div className="text-red-500 mt-1 text-sm">{formik.errors.categoryId}</div>}

                    <FormSelection
                        label="Status"
                        name="status"
                        type="radio"
                        options={[
                            { id: 1, label: "Published" },
                            { id: 2, label: "Draft" }
                        ]}
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        //@ts-ignore
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.status && formik.errors.status && <div className="text-red-500 mt-1 text-sm">{formik.errors.status}</div>}

                    {formik.values.status === 'published' && showPicker && (
                        <FormInput
                            label="Published Date"
                            name="publishedDate"
                            type="date"
                            value={formik.values.publishedDate}
                            onChange={formik.handleChange}
                            //@ts-ignore
                            disabled={formik.values.status !== 'published'}
                        />
                    )}
                    {formik.touched.publishedDate && formik.errors.publishedDate && <div className="text-red-500 mt-1 text-sm">{formik.errors.publishedDate}</div>}

                    <FormSelection
                        label="Tags"
                        name="tagIds"
                        type="checkbox"
                        options={TAGS.map<Option>(tag => ({ id: tag.id, label: tag.name }))}
                        //@ts-ignore
                        value={formik.values.tagIds}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.tagIds && formik.errors.tagIds && <div className="text-red-500 mt-1 text-sm">{formik.errors.tagIds}</div>}

<ImageUpload onImageChange={()=>handleImageChange} name={`coverImage`} accept={"image/*"} />

                    <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add Blog</button>
                </form>
            </div>
        </div>
    );
}
