export interface CommentsProps {
    style: Object,
    _id?:string,
    comment: string,
    user: {
        _id?: string,
        fullName: string,
        avatarUrl?: string,
        email?: string,
    }
}