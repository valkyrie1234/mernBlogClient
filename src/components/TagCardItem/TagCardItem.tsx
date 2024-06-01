import blueFon from '../../assets/blue_fon.jpg';
import { Link } from 'react-router-dom';
import { IPostCard } from '../../Types';
import { Card, Tag, Divider, Typography } from 'antd'

export interface ITagCardItemType {
    post: IPostCard
}



const { Meta } = Card
const { Text } = Typography

export const TagCardItem: React.FC<ITagCardItemType> = ({ post }) => {

    return (
        <Link to={`/post/${post._id}`}>
            <Card
                hoverable
                cover={<img height={70} style={{ objectFit: 'cover' }} src={post.imageUrl ? `http://localhost:4444${post.imageUrl}` : blueFon} />}
            >
                <Meta title={'test'} />
                <br/>
                <Text ellipsis>
                    {
                         post.text
                    }
                </Text>
                <Divider />
                {
                    post.tags?.map((tag, i) => (
                        <Tag color='red' key={i}>{tag}</Tag>
                    ))
                }
            </Card>
        </Link>
    );
}

export default TagCardItem;


