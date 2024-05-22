
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Avatar } from "antd";
import { AlertOutlined, UserOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../store/Hooks/useSelector';
import { logout, selectIsAuth } from '../../store/slices/auth';
import { useAppDispatch } from '../../store/Hooks/useDispatch';
import { Paths } from '../../consts/consts';
import { userApi } from '../../store/Api/UserApi';





const MyHeader: React.FC = () => {

    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(selectIsAuth)
    // const data = useAppSelector(state => state.USER.data)

    const { data: userData } = userApi.useGetMeQuery()

    console.log(userData)

    const onClicklogout = (): void => {
        if (window.confirm('are you sure?')) {
            dispatch(logout())
        }
    }

    // console.log(data)

    return (
        <Row align={'middle'} style={{ height: 70, background: '#222222' }}>
            <Col offset={6} span={12}>

                {
                    !isAuth
                        ?
                        (<Row justify={'space-between'} align={'middle'}>
                            <Col span={12}>
                                <Avatar size={48} icon={<Link to={Paths.Main}><AlertOutlined /></Link>} />
                            </Col>
                            <Col span={12} style={{ display: 'flex', justifyContent: 'end', gap: '12px' }}>
                                <Button style={{ borderRadius: '0px' }} type='primary'><Link to={Paths.Registration}>Зарегистрироваться</Link></Button>
                                <Button style={{ borderRadius: '0px' }} type='primary'><Link to={Paths.Login}>Войти</Link></Button>
                            </Col>
                        </Row>)
                        :
                        (<Row justify={'space-between'} align={'middle'}>
                            <Col span={12}>
                                <Avatar size={48} icon={<Link to={'/'}><AlertOutlined /></Link>} />
                            </Col>
                            <Col span={12} style={{ display: 'flex', justifyContent: 'end', gap: '12px', alignItems: 'center' }}>
                                {
                                    userData?.avatarUrl ? (<Avatar size={48} src={`http://localhost:4444${userData?.avatarUrl}`} />)
                                        : (<Avatar size={48} icon={<UserOutlined />} />)
                                }
                                <div style={{ color: 'white' }}>
                                    <Link style={{ color: 'white' }} to={`/profile/${userData?._id}`}>{userData?.email}</Link>
                                    <p>{userData?.fullName}</p>
                                </div>
                                <Button style={{ borderRadius: '0px' }} type='primary'><Link to={Paths.CreatePost}>Создать пост</Link></Button>
                                <Button danger style={{ borderRadius: '0px' }} onClick={() => onClicklogout()} type='primary'><Link to={Paths.Main}>Выйти</Link></Button>
                            </Col>
                        </Row>)
                }
            </Col>
        </Row>
    );
};

export const MemoizedMyHeader = React.memo(MyHeader);