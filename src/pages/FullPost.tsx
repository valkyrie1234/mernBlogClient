import React from 'react'

import { MemoizedMyHeader } from '../components/Header/MyHeader';
import FullPostCard from '../components/FullPostCard/FullPostCard';





const FullPost: React.FC = () => {

    return (
        <>
            <MemoizedMyHeader />
            <FullPostCard />
        </>
    );
}

export default FullPost;