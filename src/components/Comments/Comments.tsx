 import { Col, Card, Typography, Avatar, List } from 'antd';
import { CommentsProps } from '../../Types';






const Comments: React.FC<CommentsProps> = ({ style, comment, user }) => {
    const { Text } = Typography;

    console.log(user)

    const data = [
        {
            name: 'Ibragim',
            fullName: 'ChihPih',
            commentari: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati culpa enim consequuntur praesentium! Adipisci, aliquam pariatur aliquid beatae neque tenetur labore est eum. Aspernatur, veritatis. Quibusdam praesentium nemo accusamus sunt veniam nam ducimus nostrum maiores saepe aliquid, architecto voluptatem facilis ullam dolore iste fugiat a? Laudantium error pariatur ipsum autem, iusto est repellat cumque, corrupti sunt odit exercitationem excepturi deleniti.'
        },
    ];


    return (
        <Card style={style}>
            <Col>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(_, index) => (
                        <List.Item key={index}>
                            <List.Item.Meta
                                avatar={<Avatar size={64} src={`http://localhost:4444${user?.avatarUrl}`} />}
                                title={<Text>{user.fullName} {user.email}</Text>}
                                description={comment}
                            />
                        </List.Item>
                    )}
                />
            </Col>
        </Card>
    );
}

export default Comments;