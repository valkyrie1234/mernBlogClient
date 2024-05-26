export interface IPostCard {
    editable?: boolean,
    _id: string, 
    title: string, 
    viewsCount: number,
    createdAt: Date,
    tags: Array<string>,
    imageUrl?: string,
    style?: Object,
    postImage?: Array<string>
    user: {
        _id?: string,
        fullName: string,
        avatarUrl?: string,
        email?: string,
    } ,
    postComment?: Array<IPostComments>
}

export interface IPostComments {
    user: {
        _id?: string,
        fullName: string,
        avatarUrl?: string,
        email?: string,
    },
    comment: string,
    _id: string,
}