import { IPostComments } from "./PostCardType"

export interface IFullPost{
    _id?: string,
    title: string,
    text:string,
    viewsCount: number,
    createdAt: Date,
    updatedAt?: Date,
    tags?: Array<string>,
    imageUrl?: string,
    postImage?: Array<string>
    postComment?: Array<IPostComments>
}

