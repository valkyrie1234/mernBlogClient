import React from 'react'
import { useAppDispatch } from '../../store/Hooks/useDispatch';
import useDebounce from '../../customHooks/useDebounce';
import { Row, Col, Button, Skeleton, Input } from 'antd';
import { searched } from '../../store/slices/searchValue';




export interface IFilterBar {
    isPostsLoading: boolean,
    setIsPopular: (data: boolean) => void
}

const FilterBar: React.FC<IFilterBar> = ({ isPostsLoading, setIsPopular }) => {

    const [search, setSearch] = React.useState<string>('')

    // const isSearchedPostsloading = useAppSelector((state) => state.POSTS.posts.isSearchedPostsLoading)
    const dispatch = useAppDispatch()

    // const { data: searchedPosts } = postsApi.useGetSearchedPostsQuery(search)

    const debouncedSearch = useDebounce(search, 1000)





    React.useEffect(() => {
        dispatch(searched(debouncedSearch))
    }, [debouncedSearch])

    const showPopular = (): void => {
        setIsPopular(true)
    }
    const showAll = (): void => {
        setIsPopular(false)
    }

    const onChangeHandler = (event: any) => {
        setSearch(event.target.value)
    }

    return (
        <Row style={{ paddingTop: 20 }}>
            {
                isPostsLoading
                    ? (<Col offset={6} span={1} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Skeleton.Button active />
                        <Skeleton.Button active />
                    </Col>)
                    : (<Col offset={6} span={4} style={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                        <div style={{ display: 'flex', background: 'white', alignItems: 'center' }}>
                            <Input
                                type="text"
                                placeholder='search...'
                                value={search}
                                style={{ borderRadius: 0, border: 0 }}
                                onChange={onChangeHandler}
                            />
                            {/* {
                                isSearchedPostsloading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 20, marginLeft: -40 }} spin />} /> : ''
                            } */}
                        </div>
                        <Button style={{ borderRadius: 0, border: '0px' }} onClick={showAll}>all</Button>
                        <Button style={{ borderRadius: 0, border: '0px', borderLeft: '1px solid gray' }} onClick={showPopular}>popular</Button>
                    </Col>)
            }
        </Row>
    )
}


export default FilterBar