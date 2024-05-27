export interface ICreatePostParam {
    id?:string,
    title: string,
    text:string,
    imageUrl: string, 
    tags: Array<string | number | null | undefined>
}

