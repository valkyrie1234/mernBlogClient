import React from 'react';
import axios from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Button, Input, Image, Select } from 'antd';
import SimpleMDE from 'react-simplemde-editor';
import styles from './CreatePost.module.scss';
import 'easymde/dist/easymde.min.css';
import PageTransition from '../../components/PageTransition/PageTransition';
import { MemoizedMyHeader } from '../../components/Header/MyHeader';
import { postsApi, useGetCurrentPostQuery } from '../../store/Api/PostApi';
import type { SelectProps } from 'antd';





const CreatePost: React.FC = () => {
    const { id } = useParams()
    const isEditing = Boolean(id)
    const navigate = useNavigate()

    const [imageUrl, setImageUrl] = React.useState<string>('')
    const [title, setTitle] = React.useState<string>('')
    const [text, setText] = React.useState<string>('')
    const [tags, setTags] = React.useState<Array<string>>([])
    const inputFileRef = React.useRef<HTMLInputElement>(null)

    const [createPost] = postsApi.useCreatePostMutation()
    const [updatePost] = postsApi.useUpdatePostMutation()
    const [getCurrentPosts] = postsApi.useLazyGetCurrentPostQuery()
    const [selectValue, setSelectValue] = React.useState()

    React.useEffect(() => {
        setTimeout(() => {
            if (id) {
                getCurrentPosts(id).then(({ data }) => {
                    setTitle(data?.title);
                    setText(data?.text);
                    setTags(data.tags.join(','));
                    setImageUrl(data?.imageUrl);
                })
            }
        }, 1000)
    }, [])

    const optionsSelect: SelectProps['options'] = [{ value: 'React', label: 'React' }];

    for (let i = 34; i < 36; i++) {
        optionsSelect.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
        }),
        [],
    );

    const handleChangeTitle = (event: any): void => {
        setTitle(event.target.value)
    }

    const handleAddTags = (event: any): void => {
        setTags(event.target.value.split(','))
    }

    const handleChangeText = React.useCallback((text: string) => {
        setText(text);
    }, []);

    const handleChange = (value: string) => {
    };



    const handleChangeFile = async (event: any) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0]
            formData.append('image', file)
            const { data } = await axios.post('/upload', formData);
            setImageUrl(data.url)
        } catch (error) {
            
        }
    }

    const onClickRemoveImage = (): void => {
        setImageUrl('')
    }


    const onSubmit = async () => {
        const fields = {
            id,
            title,
            text,
            imageUrl,
            tags: tags,
        }
        navigate(`/`)
        id ? updatePost(fields) : createPost(fields)
    }



    return (
        <div>
            <MemoizedMyHeader />
            <PageTransition>
                <Row>
                    <Col span={12} offset={6} style={{ marginTop: 10 }}>
                        <Card
                            cover={imageUrl ? <Image height={300} style={{ objectFit: "cover" }} src={`http://localhost:4444${imageUrl}`} /> : ''}
                        >
                            <Button
                                onClick={() => inputFileRef.current && inputFileRef.current.click()}
                                style={{ borderRadius: 0 }}
                            >Загрузить превью
                            </Button>
                            {
                                imageUrl ? (
                                    <Button
                                        onClick={() => onClickRemoveImage()}
                                        danger
                                        style={{ marginLeft: 10, borderRadius: 0 }}
                                    >
                                        Отменить
                                    </Button>
                                ) :
                                    ''
                            }
                            <input ref={inputFileRef} onChange={handleChangeFile} type="file" hidden />
                            <br />
                            <br />
                            <Input
                                onChange={handleChangeTitle}
                                placeholder='Введите заголовок статьи'
                                style={{ border: 0, borderRadius: 0 }}
                                size='large'
                                value={title}
                            />
                            <br />
                            <br />
                            <Input placeholder='Введите теги'
                                style={{ border: 0, borderRadius: 0, borderBottom: "1px solid gray" }}
                                onChange={handleAddTags}
                                value={tags}
                            />
                            <Select
                                mode="tags"
                                style={{ width: '100%' }}
                                placeholder="Tags Mode"
                                onChange={handleChange}
                                options={optionsSelect}
                                tokenSeparators={[',']}
                            />
                            <br />
                            <br />
                            <SimpleMDE
                                value={text}
                                options={options}
                                onChange={handleChangeText}
                                className={styles.editor}
                            />
                            <br />
                            <br />
                            <Button type='primary' style={{ borderRadius: 0 }} onClick={onSubmit}>{isEditing ? "Сохранить" : "Опубликовать"}</Button>
                            <Button type='link' danger style={{ borderRadius: 0, marginLeft: 5 }}>Отмена</Button>
                        </Card>
                    </Col>
                </Row>
            </PageTransition>
        </div>
    );
}

export default CreatePost;