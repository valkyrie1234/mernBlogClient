export interface IUserType {
    user: {
        _id?: string,
        fullName: string,
        email: string,
        password: string,
        token: string,
        avatarUrl: string
    } | null,
}


export interface IUserSliceType {
    _id?: string,
    fullName: string,
    email: string,
    password: string,
    token: string,
    avatarUrl: string
}

export interface IUserUpdateDataType {
    _id?: string,
    data: {
        fullName?: string,
        email?: string,
        password?: string,
        token?: string,
        avatarUrl?: string
    }
}