import React from 'react'
import { Col, Input, Avatar, Button } from 'antd'
import { userApi } from '../../store/Api/UserApi'
import { postsApi } from '../../store/Api/PostApi'
import { useParams } from 'react-router-dom'
import { SendOutlined } from '@ant-design/icons'
import EmojiPicker from 'emoji-picker-react';
import { EmojiType } from '../../Types/EmojiType';

const { TextArea } = Input



export const MessageForm: React.FC = () => {

    const [message, setMessage] = React.useState<string>('')
    const { data } = userApi.useGetMeQuery()
    const { id } = useParams()
    const [openEmoji, setOpenEmoji] = React.useState<boolean>(false)
    const [sendMessage] = postsApi.useSendCommentMutation()

    const onSubmitMessage = async () => {
        if (!message) {
            return alert('Напишите сообщение')
        }
        sendMessage({ postId: id, user: data?._id, comment: message })
        setMessage('')
    }

    const onEmojiClick = (emoji: EmojiType) => setMessage(`${message} ${emoji}`)
    return (
        <Col style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Avatar size={48} src={`http://localhost:4444${data?.avatarUrl}`} />
            <TextArea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter comment..."
                autoSize={{ minRows: 2, maxRows: 6 }}
                style={{ width: '90%' }}
            />
            <Button
                style={{ border: 0 }}
                icon={<SendOutlined />}
                onClick={onSubmitMessage}
            />
            <div
                style={{ cursor: 'pointer', position:'relative' }}
                onClick={() => setOpenEmoji(!openEmoji)}>
                😀
                <EmojiPicker
                    style={{ position: 'absolute', left:-30,top: -460 }}
                    onEmojiClick={(emoji: any) => onEmojiClick(emoji.emoji)}
                    open={openEmoji}
                />
            </div>
        </Col>
    );
}

export default MessageForm;