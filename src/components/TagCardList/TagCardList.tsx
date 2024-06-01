import { useParams } from "react-router-dom";
import TagCardItem from "../TagCardItem/TagCardItem";
import { tagsApi } from '../../store/Api/TagsApi';
import { Row, Col } from 'antd'
import { IPostCard } from '../../Types';

export const TagCardList: React.FC = () => {

    const { tag } = useParams()
    const { data } = tagsApi.useGetPostsByTagsQuery(tag?.trim())

    return (
        <Row style={{ margin: 0, marginTop: 10 }} gutter={[10, 10]}>
            {
                data?.map((post: IPostCard, i: number) => (
                    <Col
                        key={post._id}
                        offset={i % 2 === 0 ? 6 : 0}
                        span={6}
                    >
                        <TagCardItem
                            key={post._id}
                            post={post}
                        />
                    </Col>
                ))
            }
        </Row>
    );
}

export default TagCardList;


