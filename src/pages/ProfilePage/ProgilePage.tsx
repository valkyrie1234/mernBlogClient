import React from 'react';
import axios from '../../axios'
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Button, Image, Typography, Modal, Input } from 'antd';
import { useAppSelector } from '../../store/Hooks/useSelector';
import { UserOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../store/Hooks/useDispatch';
import { fecethUpdatedUserData } from '../../store/slices/auth';
import { MemoizedMyHeader } from '../../components/Header/MyHeader';
const { Title } = Typography;


const ProfilePage: React.FC = () => {

    const [newAvatarUrl, setNewAvatarUrl] = React.useState<string>('');
    const [newName, setNewName] = React.useState<string>('');
    const [newEmail, setNewEmail] = React.useState<string>('');
    const [visibilityModal, setVisibilityModal] = React.useState<boolean>(false)
    const user = useAppSelector((state) => state.authReducer.data)
    const navigate = useNavigate();
    console.log(user)
    const inputAvatarRef = React.useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    const { id } = useParams()


    const handleChangeAvatar = async (event: any) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0]

            formData.append('image', file);

            const { data } = await axios.post('/upload', formData);

            setNewAvatarUrl(data.url);

        } catch (error) {
            console.log(error)
        }
    }

    const onClickRemoveImage = (): void => {
        setNewAvatarUrl('')
    }

    const onClickChangeVisibilityModalName = (): void => {
        setVisibilityModal(true)
    }

    const closeModal = (): void => {
        setVisibilityModal(false)
        setNewName('');
        setNewEmail('')
    }

    const onChangeName: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
        setNewName(e.target.value)
    }
    const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
        setNewEmail(e.target.value)
    }

    const onSubmit = async () => {
        const newData = {
            _id: id,
            data: {
                email: newEmail ? newEmail : user?.email,
                avatarUrl: newAvatarUrl ? newAvatarUrl : user?.avatarUrl,
                fullName: newName ? newName : user?.fullName
            }
        }
        dispatch(fecethUpdatedUserData(newData))
        navigate('/')
    }

    console.log(id)

    return (
        <div>
            <MemoizedMyHeader />
            <Row style={{ marginTop: 10 }}>
                <Col offset={6} span={12}>
                    <Card
                        cover={newAvatarUrl ? <Image
                            height={100}
                            style={{ objectFit: "cover" }}
                            src={`http://localhost:4444${newAvatarUrl}`}
                        />
                            :
                            <Image
                                height={100}
                                style={{ objectFit: "cover" }}
                                src={`http://localhost:4444${user?.avatarUrl}`}
                            />
                        }

                    >
                        <Button
                            onClick={() => inputAvatarRef.current && inputAvatarRef.current.click()}
                        >Загрузить автарку</Button>
                        {
                            newAvatarUrl ? (
                                <Button
                                    onClick={() => onClickRemoveImage()}
                                    danger
                                    style={{ marginLeft: 10, borderRadius: 0 }}
                                >
                                    Отменить
                                </Button>
                            ) :
                                ''
                        }
                        <input
                            type="file"
                            ref={inputAvatarRef}
                            hidden
                            onChange={handleChangeAvatar}
                        />

                        <br />
                        <br />
                        <Col span={12} style={{ display: 'flex' }}>
                            <Title level={4}>
                                Имя: {
                                    newName ? newName :
                                        user?.fullName
                                }
                            </Title>
                            <Button
                                type='link'
                                style={{ marginLeft: 10 }}
                                onClick={onClickChangeVisibilityModalName}
                            >
                                Change
                            </Button>
                        </Col>
                        <Col span={12} >
                            <Title level={4}>
                                Email: {
                                    newEmail ? newEmail
                                        : user?.email
                                }
                            </Title>
                        </Col>
                        <Modal
                            open={visibilityModal}
                            onCancel={closeModal}
                            onOk={() => setVisibilityModal(false)}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                type="text"
                                placeholder={user?.fullName}
                                style={{ marginTop: 30 }}
                                value={newName}
                                onChange={onChangeName}
                            />
                            <Input
                                prefix={<UserOutlined />}
                                type="text"
                                placeholder={user?.email}
                                style={{ marginTop: 30 }}
                                value={newEmail}
                                onChange={onChangeEmail}
                            />
                        </Modal>
                        <Button onClick={onSubmit}>
                            Сохранить
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProfilePage