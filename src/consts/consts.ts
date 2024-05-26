

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
    TagsPage:'/tags/:tag',
    Error: '*'
} as const 

export const Api = {
    PostsApi: 'PostsApi',
    UserApi: 'UserApi'
} as const 

export const BaseUrl = {
    url: 'http://localhost:4444'
} as const

export const Endpoints = {
    posts: '/post',
    popularPosts: '/post/popular',
    serachedPosts: '/post/search/',
    currentPost: '/post/',
    registartion: '/auth/register',
    login: '/auth/login',
    lastFiveTags: '/tags',
    postsByTags: '/post/postsBytags/'
} as const