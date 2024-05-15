

export const NameSpace = {
    Posts: "POSTS",
    User: "USER",
    Loaders: "LOADERS"
} as const


export const Paths = {
    Main: '/',
    CreatePost: '/createPost',
    EditPost: '/createPost/:id/edit',
    Login: '/login',
    Registration: '/registration',
    CurrentPost: '/post/:id',
    UserProfile: '/profile/:id',
    Error: '*'
} as const 