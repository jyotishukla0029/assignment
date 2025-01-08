export interface Category {
    id: number,
    name: string
}

export const CATEGORIES: Category[] = [
        {id: 1, name:'Tech'},
        {id: 2, name:'Lifestyle'},
        {id: 3, name:'Health'},
        {id: 4, name:'Travel'},
        {id: 5, name:'Other'}];


export interface Tag {
    id: number,
    name: string
}

export const TAGS: Tag[] = [
    {id: 1, name:'Java'},
    {id: 2, name:'React'},
    {id: 3, name:'JDK 23'},
    {id: 4, name:'Mountains'},
    {id: 5, name:'Beaches'},
    {id: 6, name:'Diet'},
    {id: 7, name:'Workout'},
    {id: 8, name:'Singing'},
];