
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Avatar } from "antd";
import { AlertOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../store/Hooks/useDispatch';
import { Paths } from '../../consts/consts';
import { userApi } from '../../store/Api/UserApi';





const MyHeader: React.FC = () => {

    const dispatch = useAppDispatch()

    const { data: userData } = userApi.useGetMeQuery()


    const onClicklogout = (): void => {
        if (window.confirm('are you sure?')) {
            window.localStorage.removeItem('token');
            dispatch(userApi.util.resetApiState());
        }
    }



    return (
        <Row align={'middle'} style={{ height: 70, background: '#222222' }}>
            <Col offset={6} span={12}>

                {
                    !userData
                        ?
                        (<Row justify={'space-between'} align={'middle'}>
                            <Col span={12}>
                                <Avatar size={48} icon={<Link to={Paths.Main}><AlertOutlined /></Link>} />
                            </Col>
                            <Col span={12} style={{ display: 'flex', justifyContent: 'end', gap: '12px' }}>
                                <Link to={Paths.Registration}><Button style={{ borderRadius: '0px' }} type='primary'>Зарегистрироваться</Button></Link>
                                <Link to={Paths.Login}><Button style={{ borderRadius: '0px' }} type='primary'>Войти</Button></Link>
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
                                <Link to={Paths.CreatePost}><Button style={{ borderRadius: '0px' }} type='primary'>Создать пост</Button></Link>
                                <Link to={Paths.Main}><Button danger style={{ borderRadius: '0px' }} onClick={() => onClicklogout()} type='primary'>Выйти</Button></Link>
                            </Col>
                        </Row>)
                }
            </Col>
        </Row>
    );
};

export const MemoizedMyHeader = React.memo(MyHeader);