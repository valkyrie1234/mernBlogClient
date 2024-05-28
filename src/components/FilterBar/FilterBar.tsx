import React from 'react'
import { useAppDispatch } from '../../store/Hooks/useDispatch';
import useDebounce from '../../customHooks/useDebounce';
import { Row, Col, Button, Input } from 'antd';
import { searched } from '../../store/slices/searchValue';
import { setAll, setPopular } from '../../store/slices/filterBarSlice';
import { postsApi } from '../../store/Api/PostApi';







const FilterBar: React.FC = () => {

    const dispatch = useAppDispatch()

    const [search, setSearch] = React.useState<string>('')

    const debouncedSearch = useDebounce(search, 1000)

    const { isLoading: isPostsLoading } = postsApi.useGetAllPostsQuery()




    React.useEffect(() => {
        dispatch(searched(debouncedSearch))
    }, [debouncedSearch])

    const showPopular = (): void => {
        dispatch(setPopular(true))
    }
    const showAll = (): void => {
        dispatch(setAll(false))
    }

    const onChangeHandler = (event: any) => {
        setSearch(event.target.value)
    }

    return (
        <Row style={{ paddingTop: 20 }}>
            <Col offset={6} span={4} style={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
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
            </Col>
        </Row>
    )
}


export default FilterBar