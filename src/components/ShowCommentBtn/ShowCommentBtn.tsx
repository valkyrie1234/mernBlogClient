import React from 'react'
import { postsApi } from '../../store/Api/PostApi';
import { Col, Badge, Avatar } from 'antd';
import { MessageOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../store/Hooks/useDispatch';
import { showComment } from '../../store/slices/showCommentBtn';


export interface ShowCommentsBtnType {
    postId: string | undefined,
}

export const ShowCommentBtn: React.FC<ShowCommentsBtnType> = ({ postId }) => {

    const [show, setShow] = React.useState<boolean>(false)
    const dispatch = useAppDispatch()
    const { data: currentPost } = postsApi.useGetCurrentPostQuery(postId)

    const showCommentHandler = () => {
        setShow((prev) => !prev);
        dispatch(showComment(show))
    }

    return (
        <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Badge style={{ marginTop: 17, marginRight: 3 }} count={!currentPost?.postComment?.length ? 0 : currentPost?.postComment?.length}>
                <Avatar style={{ marginTop: 10 }} onClick={showCommentHandler} alt='Всего комментариев' size={44} icon={<MessageOutlined />} />
            </Badge>
        </Col>
    );
}

export default ShowCommentBtn;