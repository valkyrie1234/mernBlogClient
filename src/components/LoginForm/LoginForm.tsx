import React from 'react'
import { Row, Col, Card, Divider, Button, Form, Input } from 'antd';
import { userApi } from '../../store/Api/UserApi';
import { IUserLogin } from '../../Types';
import type { FormProps } from 'antd';
import { Navigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {

    const { data: userData } = userApi.useGetMeQuery()
    const [login] = userApi.useUserLoginMutation()


    if (userData) {
        return <Navigate to={'/'} />
    }

    const onFinish: FormProps<IUserLogin>['onFinish'] = (values: IUserLogin) => {
        login(values).then((res: any) => {
            window.localStorage.setItem('token', res.data.token)
        })
    };

    return (
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
    );
}

export default LoginForm;

// <Row align={'middle'} justify={'center'}>
//     <Col span={8} style={{ marginTop: 10 }}>
//         <Card>
//             <Divider>
//                 Login
//             </Divider>
//             <Form
//                 name="basic"
//                 labelCol={{ span: 6 }}
//                 wrapperCol={{ span: 16 }}
//                 style={{ maxWidth: 600 }}
//                 initialValues={{ remember: true }}
//                 onFinish={onFinish}
//                 autoComplete="off"
//             >
//                 <Form.Item<IUserLogin>
//                     label="email"
//                     name="email"
//                     rules={[{ required: true, message: 'Please input your username!' }]}
//                 >
//                     <Input />
//                 </Form.Item>

//                 <Form.Item<IUserLogin>
//                     label="Password"
//                     name="password"
//                     rules={[{ required: true, message: 'Please input your password!' }]}

//                 >
//                     <Input.Password />
//                 </Form.Item>
//                 <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
//                     <Button type="primary" htmlType="submit">
//                         Submit
//                     </Button>
//                 </Form.Item>
//             </Form>
//         </Card>
//     </Col>
// </Row>