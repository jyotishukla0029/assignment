import {Category, Tag} from "@/models/Category";

export interface Blog {
    id: string,
    title?: string,
    description?: string,
    category?: Category,
    tags?: Tag[],
    status?: BlogStatus,
    coverImage?: string,
    publishedDate?: string
}

export interface BlogPayload {
    id: string,
    title?: string,
    description?: string,
    categoryId?: number,
    tagIds?: number[],
    status?: BlogStatus,
    coverImage?: string,
    publishedDate?: string
}

export enum BlogStatus {
    PUBLISHED = "published", DRAFT = "draft"
}