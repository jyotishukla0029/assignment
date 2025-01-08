import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Blog} from "@/models/Blog";

interface BlogState {
    blogs: Blog[]
}

const initialState: BlogState = {
    blogs: [],
};

const blogsSlice = createSlice({
    name: 'blogs_slice',
    initialState,
    reducers: {
        removeBlog: (state, action: PayloadAction<string>) => {
            const idx = state.blogs.findIndex(blog=> blog.id = action.payload);
            state.blogs.splice(idx, 1);
        },
        addBlog: (state, action: PayloadAction<Blog>) => {
            state.blogs.push(action.payload)
        },
    },
});

export const { addBlog, removeBlog } = blogsSlice.actions;

export default blogsSlice.reducer;
