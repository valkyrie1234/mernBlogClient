import React from 'react'
import EmojiPicker from 'emoji-picker-react';
import { useAppSelector } from '../../store/Hooks/useSelector';
import axios from '../../axios/index'
import { useParams } from 'react-router-dom';
import { Modal, Input } from 'antd';
import { IFullPost } from '../../Types';
import { postsApi } from '../../store/Api/PostApi';

interface IModalMessageProps {
    postId: string | undefined,
}


const ModalMessage: React.FC<IModalMessageProps> = ({ postId }) => {


    const [showModal, setShowModal] = React.useState<boolean>(true)
    const [message, setMessage] = React.useState<string>('')
    const [openEmoji, setOpenEmoji] = React.useState<boolean>(false)

    const userId = useAppSelector(state => state.USER.data?._id)


    const onEmojiClick = ({ emoji }: any) => setMessage(`${message} ${emoji}`)

    const [sendMessage] = postsApi.useSendCommentMutation()

    const onSubmitMessage = async () => {
        if (!message) {
            return alert('Напишите сообщение')
        }
        sendMessage({ postId: postId, user: userId, comment: message })
        setShowModal(false)
    }

    return (
        <Modal open={showModal} onCancel={() => setShowModal(false)} onOk={() => onSubmitMessage()}>
            <p>Ваш Комментарий</p>
            <Input type='text' value={!message ? ' ' : message}
                onChange={(e) => setMessage(e.target.value)}
                suffix={
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => setOpenEmoji(!openEmoji)}>
                        😀
                        <EmojiPicker
                            style={{ position: 'absolute' }}
                            onEmojiClick={(emoji: any) => onEmojiClick(emoji)}
                            open={openEmoji}
                        />
                    </div>
                }
            />
        </Modal>
    );
}

export default ModalMessage;