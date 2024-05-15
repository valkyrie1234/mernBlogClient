import React from 'react';
import PageTransition from '../../components/PageTransition/PageTransition';
import { Navigate } from 'react-router-dom';
import { Row, Col, Card, Divider } from 'antd';
import { useAppDispatch } from '../../store/Hooks/useDispatch';
import { useAppSelector } from '../../store/Hooks/useSelector';
import { fetchUserData, selectIsAuth } from '../../store/slices/auth';
import { IUserLogin } from '../../Types';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { MemoizedMyHeader } from '../../components/Header/MyHeader';





const Login: React.FC = () => {

    const isAuth = useAppSelector(selectIsAuth)
    const dispatch = useAppDispatch();

    console.log(isAuth)

    const onFinish: FormProps<IUserLogin>['onFinish'] = (values: IUserLogin) => {
        dispatch(fetchUserData(values))
    };

    if (isAuth) {
        return <Navigate to={'/'} />
    }

    return (
        <div>
            <MemoizedMyHeader/>
            <PageTransition>
            <Row align={'middle'} justify={'center'}>
                <Col span={8} style={{ marginTop: 10 }}>
                    <Card>
                        <Divider>
                            Login
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
                            <Form.Item<IUserLogin>
                                label="email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<IUserLogin>
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}

                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
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

export default Login;






