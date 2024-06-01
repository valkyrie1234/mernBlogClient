import React from 'react'
import { MemoizedMyHeader } from '../../components/Header/MyHeader';
import TagCardList from '../../components/TagCardList/TagCardList';


export const TagsPage: React.FC = () => {

    return (
        <div>
            <MemoizedMyHeader />
            <TagCardList />
        </div>
    );
}

export default TagsPage;