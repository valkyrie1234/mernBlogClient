import React from 'react'
import EmojiPicker from 'emoji-picker-react';
import { useAppSelector } from '../../store/Hooks/useSelector';
import axios from '../../axios/index'
import { useParams } from 'react-router-dom';
import { Modal, Input } from 'antd';
import { IFullPost } from '../../Types';

interface IModalMessageProps {
    setDataAction: (data:IFullPost) => void
}


const ModalMessage: React.FC<IModalMessageProps> = ({ setDataAction }) => {


    const [showModal, setShowModal] = React.useState<boolean>(true)
    const [message, setMessage] = React.useState<string>('')
    const [openEmoji, setOpenEmoji] = React.useState<boolean>(false)

    const userId = useAppSelector(state => state.authReducer.data?._id)

    const { id } = useParams();

    const onEmojiClick = ({ emoji }: any) => setMessage(`${message} ${emoji}`)



    const onSubmitMessage = async () => {
        if (!message) {
            return alert('Напишите сообщение')
        }
        await axios.patch(`/comment/post/${id}`, {
            id: userId,
            comment: message,
        })
        setShowModal(false)
        axios.get<IFullPost>(`/post/${id}`).then((res) => {
            setDataAction(res.data);
        }).catch((err) => {
            console.warn(err),
                alert('error')
        })
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