import { postsApi } from "../../store/Api/PostApi";
import { useAppSelector } from "../../store/Hooks/useSelector";
import Comments from "../Comments/Comments";


export interface IPostCommentsListType {
    postId: string | undefined
}

const PostCommentsList: React.FC<IPostCommentsListType> = ({postId}) => {

    const showComment = useAppSelector((state) => state.SHOW_COMMENTS.isShow)
    const {data: currentPost} = postsApi.useGetCurrentPostQuery(postId)
    return (
        <>
            {
                !showComment && currentPost?.postComment ?
                    currentPost?.postComment?.map((el) => (
                        <Comments key={el._id} style={{ marginTop: 10, borderRadius: 0, border: '0px', borderTop: '1px solid gray' }} user={el.user} comment={el.comment} />
                    )).slice(0, 1)
                    : ''
            }
            {
                !showComment ?
                    ''
                    :
                    currentPost?.postComment?.map((el) => (
                        <Comments key={el._id} style={{ marginTop: 10, borderRadius: 0, border: '0px', borderTop: '1px solid gray' }} user={el.user} comment={el.comment} />
                    ))
            }
        </>
    );
}

export default PostCommentsList;