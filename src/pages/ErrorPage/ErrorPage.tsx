import React from 'react'
import { Row, Col, Typography, Card, Button } from 'antd'
import {Link} from 'react-router-dom'
import { Paths } from '../../consts/consts'

const { Title } = Typography

const ErrorPage: React.FC = () => {
    return (
        <Row style={{ height: '100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Col span={12} >
                <Card style={{display:'flex',textAlign:'center',flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'#1677ff'}}>
                    <Title level={1}>
                        Error 404
                    </Title>
                    <Title level={3}>
                        Такой страницы не существует.
                    </Title>
                    <Button type='link'><Link style={{color:'white'}} to={Paths.Main}>Вернуться на главную</Link></Button>
                </Card>
            </Col>
        </Row>
    );
}

export default ErrorPage;