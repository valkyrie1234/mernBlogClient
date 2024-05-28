import React from 'react';
import { Navigate } from 'react-router-dom';
import { Row, Col, Card, Divider, Button, Form, Input, FormProps } from 'antd';
import { IUserReg } from '../../Types';
import PageTransition from '../../components/PageTransition/PageTransition';
import {MemoizedMyHeader} from '../../components/Header/MyHeader';
import { userApi } from '../../store/Api/UserApi';





const Registartion: React.FC = () => {




    const [registartion] = userApi.useUserRegistartionMutation()


    const onFinish: FormProps<IUserReg>['onFinish'] = (values: IUserReg) => {
        registartion(values).then((res) => {
            window.localStorage.setItem('token', res.data.token)
        }).catch((err) => console.log(err))
    };

    if (window.localStorage.getItem('token')) {
        return <Navigate to={'/'} />
    }

    return (
        <div>
            <MemoizedMyHeader />
            <PageTransition>
                <Row align={'middle'} justify={'center'}>
                    <Col span={8} style={{ marginTop: 10 }}>
                        <Card>
                            <Divider>
                                Registration
                            </Divider>
                            <Form
                                name="basic"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                                style={{ maxWidth: 600 }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item<IUserReg>
                                    label="email"
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item<IUserReg>
                                    label="Fullname"
                                    name="fullName"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item<IUserReg>
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}

                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </PageTransition>
        </div>
    );
}

export default Registartion;